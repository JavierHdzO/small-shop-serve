import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'text',
        nullable:false
    })
    name:string;

    @Column({
        type:'text',
        unique:true,
    })
    username:string;

    @Column({
        type:'text',
        unique:true
    })
    email:string;

    @Column({
        type:'text'
    })
    passsword:string;


    @Column({
        type:'bool',
        default: false
    })
    google:boolean;

}
