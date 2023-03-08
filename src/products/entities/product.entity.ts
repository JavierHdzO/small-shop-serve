import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class Product {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text',
        unique: true
    })
    name:string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type:'text',
        unique: true
    })
    slug:string;

    @Column({
        type: 'float'
    })
    price: number;

    
    amount: number;


    genre:string;
    

    active: boolean;
}
