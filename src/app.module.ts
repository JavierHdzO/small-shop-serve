import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.HOST_DB,
      port:Number(process.env.PORT_DB),
      username:process.env.USERNAME_DB,
      password:process.env.PASSWORD_DB,
      database:process.env.NAME_DB,
      entities:[],
      synchronize: true
    }),
    UserModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}