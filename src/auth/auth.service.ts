import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { compare } from 'bcrypt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { GoogleCreateDto } from 'src/user/dto/google-register.dto';
import { UserAuth } from 'src/user/interfaces';
@Injectable()
export class AuthService {

    private readonly client: OAuth2Client;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.client = new OAuth2Client(configService.get('CLIENT_ID_GOOGLE'));
    }

    async validateUser(email:string, pass:string):Promise<UserAuth|null>{

        const user = await this.userService.findOne(email);

        const confirmPass =  !user? 
            false:

            await compare(pass, user.password);
        
        if(!confirmPass) return null;

        const { password, ...restUser } = user!;

        return { ...restUser };
    }

    async login(user: UserAuth){
        const payload = { id: user.id };

        return {
            user,
            access_token: this.jwtService.sign( payload, { expiresIn:'24h'})
        };
    }


    async validateGoogleToken(googleCreateDto: GoogleCreateDto): Promise<TokenPayload>{

        if(!googleCreateDto.g_csrf_token) throw new BadRequestException('Critical information not found');

        const ticket = await this.client.verifyIdToken({
            idToken: googleCreateDto.credential,
            audience: this.configService.get('CLIENT_ID_GOOGLE')
        });

        const payload = ticket.getPayload();
        
        
        if(!payload || !payload.email) throw new BadRequestException('User information not found');

        return {
            ...payload
        }
    }

    

   

    
    
}
