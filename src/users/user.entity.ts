import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id:number;

    @Column({unique: true})
    user_name:string;

    @Column({unique: true})
    user_email: string;

    @Column({select: false})
    user_password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.user_email = this.user_email.toLowerCase();
    }

}