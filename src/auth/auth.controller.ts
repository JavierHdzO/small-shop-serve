import { Controller, Request, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards( LocalAuthGuard )
  @Post('login')
  async login(@Request() req:any){
    return req.user;
  }
  
}
