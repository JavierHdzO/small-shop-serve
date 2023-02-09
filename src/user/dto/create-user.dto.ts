import { IsString, Min, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Min(5)
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @Min(5)
    @IsEmail()
    email:string;

    @IsString()
    @Min(8)
    @IsNotEmpty()
    passsword:string;

}
