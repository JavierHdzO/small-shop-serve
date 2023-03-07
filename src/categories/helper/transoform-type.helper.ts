import { TypeCategory } from "../enums/type-category.enum"


export const stringToTypeEnum = ( value: any ) : string => {
    return TypeCategory[value];
}