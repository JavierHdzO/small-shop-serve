import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {  } from '@nestjs/common/exceptions';

@Injectable()
export class CategoriesService {

  private logger = new Logger(CategoriesService.name);
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | null | undefined> {

    try {
      const category = this.categoryRepository.create(createCategoryDto);

      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
       this.handlerException(error);
    }
  }

  async findAll(): Promise<Category[] | undefined> {

    try {
      const categories  = await  this.categoryRepository.find();
      return categories;

    } catch (error) {
      this.handlerException(error);
    }
  }

  async findOne(term: string) {
    
    let category: Category | null;
    if(validate(term)){
      category = await this.categoryRepository.findOneBy({ id: term});
    }else{

      category = await this.categoryRepository.findOneBy({ name: term });
    }
    
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  handlerException(error: any ){
    this.logger.error(error);

    //Database errors


    //Nest exceptions
    throw new InternalServerErrorException();

  }
}
