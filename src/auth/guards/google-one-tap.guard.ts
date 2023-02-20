import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOneTapGuard extends AuthGuard('google-one-tap'){}