import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

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
    
    try {
      let category: Category | null;

      if(validate(term)){
        category = await this.categoryRepository.findOneBy({ id: term});
      }else{

        category = await this.categoryRepository.findOneBy({ name: term });
      }
      
      return category;
    } catch (error) {
      this.handlerException(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category;
    try {
      category = await this.categoryRepository.preload({
        id,
        ...updateCategoryDto
      });
    } catch (error) {
      this.handlerException(error);
    }
    if(!category) throw new BadRequestException();

    return category;
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    if(!category || !category.active) throw new BadRequestException();

    category.active = false;

    try {
      await this.categoryRepository.save(category);

      return {
        message: `Category with ${id} was deleted successfully`
      };
    } catch (error) {
      this.handlerException(error);
    }
  }

  handlerException(error: any ){
    this.logger.error(error);

    //Database errors


    //Nest exceptions
    throw new InternalServerErrorException();

  }
}
