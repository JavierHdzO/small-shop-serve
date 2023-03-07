import { IsString, Min, IsOptional } from 'class-validator';
import { Transform, Exclude } from 'class-transformer';
import { TypeCategory } from '../enums/type-category.enum';
import { stringToTypeEnum } from '../helper/transoform-type.helper';

export class CreateCategoryDto {

    @IsString()
    @Min(3)
    name:string;


    @IsString()
    @Min(5)
    @IsOptional()
    description?: string;

    @Exclude()
    @Transform( stringToTypeEnum )
    type: TypeCategory;

}
