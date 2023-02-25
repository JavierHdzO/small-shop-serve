import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { User } from './user/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

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
      entities:[User, Category],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    CommonModule,
    ProductsModule,
    CategoriesModule

  ],
  controllers: [],
})
export class AppModule {}
