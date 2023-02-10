import { Injectable, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const user =  this.userRepository.create(createUserDto);
      console.log(user);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(term: string): Promise<User|null|void> {

    try {
      let user: User | null;
      if(validate(term)){
        user = await this.userRepository.findOneBy({ id:term });
      }else{
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        user = await queryBuilder.where(
          'username=:usernameParam OR email=:emailParam',
          {
            usernameParam: term,
            emailParam: term
          }).getOne();
      }

      if(!user?.status) user = null;
      
      return user;
    } catch (error) {
       this.handlerExceptions(error);
    }
  }

  async findOneResponse(term: string):Promise<User>{

      const user = await this.findOne(term);
      if(!user) throw new BadRequestException('User not found');
      return user;  
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User|undefined|void> {

      const user =  await this.userRepository.preload({
        id,
        ...updateUserDto
      });

      if(!user || !user.status) throw new BadRequestException('User not found');

      try {
        await this.userRepository.save(user);
        return user;
      } catch (error) {
        this.handlerExceptions(error);
      }
    
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if(!user) throw new BadRequestException('User not found');

    try {
      user.status = false;
      await this.userRepository.save(user);

    } catch (error) {
      this.handlerExceptions(error);
    }

  }

  private handlerExceptions(error: any){
    console.log(error);
    this.logger.error(error);

    if(error.code === "23505") throw new BadRequestException(error.detail);

    throw new InternalServerErrorException();
    
  }
}
