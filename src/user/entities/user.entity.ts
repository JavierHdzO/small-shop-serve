import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

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

    @BeforeInsert()
    hashPassword(){
        const salt = genSaltSync(20);
        this.passsword = hashSync(this.passsword, salt);
    }
}
