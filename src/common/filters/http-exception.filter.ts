import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {

  private readonly configService: ConfigService
  constructor(
  ){}
  catch(exception: HttpException, host: ArgumentsHost) {

    const context = host.switchToHttp();

    const response = context.getResponse<Response>();

    response.redirect(`${this.configService.get('CLIENT_DOMAIN')}/#/auth`);
  }
}
