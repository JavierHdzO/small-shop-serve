import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { GoogleCreateDto } from './dto/google-register.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Auth(Role.USER)
  @Get()
  findAll(@User() user:UserEntity) {
    console.log(user);
    return this.userService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.userService.findOneResponse(term);
  }

  
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
