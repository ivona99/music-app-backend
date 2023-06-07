import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserI } from './user.interface';
import { AuthService } from 'src/auth/services/auth.service';
// import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private authService: AuthService
    ) {}
    //get all users
    async findall(): Promise<User[]>{
        return await this.usersRepository.find();
    }
    //get one user
    async findOne(id:number): Promise<User> {
        return await this.usersRepository.findOne({where: {user_id: id}});
    }
    //create
    // async create(user: User): Promise<User> {
    //     const newUser = this.usersRepository.create(user);
    //     return await this.usersRepository.save(newUser);
    // }
    //update user
    async update (id:number, user:User):Promise<User> {
        await this.usersRepository.update(id, user);
        return await this.usersRepository.findOne({where:{user_id:id}});
    }
    //delete user
    async delete(id: number): Promise<any> {
        return this.usersRepository.delete(id);

    }


    async create(newUser:UserI):Promise<UserI> {
        try {
            const exists: boolean = await this.mailExists(newUser.user_email);
            if (!exists) {
              const passwordHash: string = await this.hashPassword(newUser.user_password);
              newUser.user_password = passwordHash;
              const user = await this.usersRepository.save(this.usersRepository.create(newUser));
              return this.findOneU(user.user_id);
            } else {
              throw new HttpException('Email or username is already in use', HttpStatus.CONFLICT);
            }
          } catch {
            throw new HttpException('Email or username is already in use', HttpStatus.CONFLICT);
          }
    }

    async login(user: UserI): Promise<string>{
        try {
            const foundUser: UserI = await this.findByEmail(user.user_email.toLowerCase());
            if (foundUser) {
              const matches: boolean = await this.validatePassword(user.user_password, foundUser.user_password);
              if (matches) {
                const payload: UserI = await this.findOneU(foundUser.user_id);
                return this.authService.generateJwt(payload);
              } else {
                throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
              }
            } else {
              throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
            }
          } catch {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          }

    }
    private async  findOneU(id:number): Promise<UserI>{
        return this.usersRepository.findOne({where:{user_id:id}});
    }


    private async mailExists(email: string):Promise<boolean> {
        const user = await this.usersRepository.findOne({ where: {user_email:email} });
        if (user) {
          return true;
        } else {
          return false;
        }
    }

    private async findByEmail(email:string): Promise<UserI> {
        return this.usersRepository.findOne({where:{user_email: email}, select: ['user_id', 'user_name', 'user_email', 'user_password']});
    }

    private async validatePassword(password: string, storedPasswordHash: string): Promise<any>{
        return this.authService.comparePasswords(password, storedPasswordHash);
    }
    private async  hashPassword(password:string): Promise<string> {
        return this.authService.hashPassword(password);
    }
}
