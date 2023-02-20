import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserAuth } from 'src/user/interfaces';
import { GoogleCreateDto } from 'src/user/dto/google-register.dto';
import { GoogleOneTapProfile } from './interfaces/google-one-tap.interface';


@Injectable()
export class AuthService {

    private readonly client: OAuth2Client;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
        this.client = new OAuth2Client(configService.get('CLIENT_ID_GOOGLE'));
    }

    async validateUser(email:string, pass:string):Promise<UserAuth|null>{

        const user = await this.userRepository.findOneBy({email});

        const confirmPass =  !user? false:
            await compare(pass, user.password);
        
        if(!confirmPass) return null;

        const { password, ...restUser } = user!;

        return { ...restUser };
    }

    async validateUserGoogle(profile: GoogleOneTapProfile){

        const [ email ] = profile.emails;
        const user = await this.userRepository.findOneBy({ email: email.value });

        if(!user || !user.status || !user.google) return null;

        const { password, ...restUser } = user;

        return { ...restUser };

    }

    

    async login(user: UserAuth){
        const payload = { id: user.id };

        return {
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
