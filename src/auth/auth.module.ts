import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    UserModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ ConfigService ],
      useFactory:  ( configService = new ConfigService()) =>{
        return {
          secret: configService.get('SECRET_KEY_JWT'),
          signOptions: {
            expiresIn: '24h'
          }
        }
      }

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports:[ AuthService ]
})
export class AuthModule {}
