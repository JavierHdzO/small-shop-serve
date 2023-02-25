import { IsString, Min, IsOptional } from 'class-validator';

export class CreateCategoryDto {

    @IsString()
    @Min(3)
    name:string;


    @IsString()
    @Min(5)
    @IsOptional()
    description?: string;

}
