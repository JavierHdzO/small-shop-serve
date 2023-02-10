import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration] ,
      validationSchema
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.HOST_DB,
      port:Number(process.env.PORT_DB),
      username:process.env.USERNAME_DB,
      password:process.env.PASSWORD_DB,
      database:process.env.NAME_DB,
      entities:[User],
      synchronize: true
    }),
    UserModule,
    AuthModule

  ],
  controllers: [],
})
export class AppModule {}
