import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserAuth } from 'src/user/interfaces';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ){}

    async validateUser(email:string, pass:string):Promise<UserAuth|null>{

        const user = await this.userService.findOne(email);

        const confirmPass =  !user? 
            false:
            await compare(pass, user.password);
        
        if(!confirmPass) return null;

        const { password, ...restUser } = user!;

        return { ...restUser };
    }
    
}
