import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from './entities/category.entity';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports:[
    TypeOrmModule.forFeature([Category]),
    AuthModule
  ]
})
export class CategoriesModule {}
