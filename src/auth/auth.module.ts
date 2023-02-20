import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { GoogleOneTapStrategy } from './strategies/google-one-tap.strategy';

@Module({
  imports:[
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ ConfigService ],
      useFactory:  ( configService: ConfigService) =>{
        return {
          secret: configService.get('SECRET_KEY_JWT'),
          signOptions: {
            expiresIn: '24h'
          }
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleOneTapStrategy],
  exports:[ AuthService, JwtStrategy ]
})

export class AuthModule {}
