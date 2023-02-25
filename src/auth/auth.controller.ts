import { Response, Request  } from 'express';
import { Controller, Req, Post, Res, UseFilters} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleOneTapGuard } from './guards/google-one-tap.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';


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
  @UseFilters( new HttpExceptionFilter() )
  async loginGoogle(@User() user:UserEntity, @Res() res:Response){
    const token = await this.authService.login(user);
    return res.redirect(`${process.env.CLIENT_DOMAIN}/#/auth?token=${token.access_token}`);
    
  }

}
