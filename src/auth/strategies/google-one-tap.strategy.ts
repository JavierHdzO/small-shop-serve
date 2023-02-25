import { response } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { GoogleOneTapStrategy as Strategy } from 'passport-google-one-tap';
import { GoogleOneTapProfile } from '../interfaces/google-one-tap.interface';

@Injectable()
export class GoogleOneTapStrategy extends PassportStrategy( Strategy ){


    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService

    ){
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            verifyCsrfToken: true

        });
    }

    async validate(profile: GoogleOneTapProfile){
        
        const user = await this.authService.validateUserGoogle(profile);

        if(!user) return null;

        return user;
    }

}