import { Controller, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards( LocalAuthGuard )
  @Post('login')
  async login(@Req() req:any){
    return this.authService.login(req.user);
  }


  // @Post('register/google')
  // registerGoogle(@Body() googleRegisterDto:GoogleRegisterDto){
    
  //   // console.log(googleRegisterDto);
  //   this.authService.validateGoogleToken(googleRegisterDto);

  //   return {
  //     ok:true
  //   }
  // }

}
