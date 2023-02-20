import { Response  } from 'express';
import * as url from 'url';
import { Controller, Req, Post, Res} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOneTapGuard } from './guards/google-one-tap.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards( LocalAuthGuard )
  login(@User() user:UserEntity){
    return this.authService.login(user);
  }


  @Post('login/google')
  @UseGuards( GoogleOneTapGuard )
  async loginGoogle(@User() user:UserEntity, @Res() res:Response){
    

    const token = await this.authService.login(user);

    return res.
    redirect(`http://localhost:5173/#/auth?token=${token.access_token}`);
    
  }

}
