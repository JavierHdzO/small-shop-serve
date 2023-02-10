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
    password:string;


    @Column({
        type:'bool',
        default: false
    })
    google:boolean;


    @Column({
        type:'bool',
        default: true
    })
    status: boolean;

    @BeforeInsert()
    hashPassword(){
        const saltRounds = genSaltSync(10);
        this.password =hashSync(this.password, saltRounds);
    }

    
}
