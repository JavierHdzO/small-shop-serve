import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { Injectable, Logger, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GoogleCreateDto } from './dto/google-register.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
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

  async createGoogle(googleCreateDto: GoogleCreateDto){
    const { email, sub, name, given_name='user' } = await this.authService.validateGoogleToken(googleCreateDto);

    if( !email || !sub ) throw new BadRequestException("User's information not found");


    const username:string = `${ given_name.replace(' ','') }-${ sub }`.toLowerCase();

    try{
      const user = this.userRepository.create({
        email,
        name,
        username,
        google:true,
        password:''
      });

      await this.userRepository.save(user);

      return user;
    }
    catch(error){
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

  async update(id: string, updateUserDto: UpdateUserDto, userAuthenticated:User):Promise<User|undefined|void> {

      const user =  await this.userRepository.preload({
        id,
        ...updateUserDto
      });

      if(!user || !user.status) throw new BadRequestException('User not found');
      if(user.id !== userAuthenticated.id) throw new UnauthorizedException();

      try {
        await this.userRepository.save(user);
        return user;
      } catch (error) {
        this.handlerExceptions(error);
      }
    
  }

  async remove(id: string, userAuthenticated:User) {
    const user = await this.findOne(id);
    if(!user || !user.status) throw new BadRequestException('User not found');
    if(user.id !== userAuthenticated.id) throw new UnauthorizedException();

    try {
      user.status = false;
      await this.userRepository.save(user);

      return { message: 'User was deleted successfully'};      

    } catch (error) {
      this.handlerExceptions(error);
    }

  }




  private handlerExceptions(error: any){
    this.logger.error(error);

    if(error.code === "23505") throw new BadRequestException(error.detail);

    throw new InternalServerErrorException();
    
  }
}
