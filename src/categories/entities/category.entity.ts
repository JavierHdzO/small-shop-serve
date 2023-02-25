import { text } from 'stream/consumers';
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';

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

    @BeforeInsert()
    setName(){
        this.name = this.name.trim().toLowerCase().replace( /\s/g, '-');
    }

}
