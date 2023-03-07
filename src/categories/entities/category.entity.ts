import { text } from 'stream/consumers';
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TypeCategory } from '../enums/type-category.enum';

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({  type: 'text', unique: true })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type:'enum',
        enum:['footwear', 'clothing', 'accessory']
    })
    type: TypeCategory;


    @Column({
        type: 'bool'
    })
    active: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    setName(){
        this.name = this.name.trim().toLowerCase().replace( /\s/g, '-');
    }

    

}
