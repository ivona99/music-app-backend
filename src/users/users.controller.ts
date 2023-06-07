import { UserHelperService } from './user-helper/user-helper.service';
import { Controller, Get,Post, Body, Param, Delete, Put, NotFoundException, UseGuards  } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserI } from './user.interface';
import { CreateUSerDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LoginResponseI } from './login-response.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private userHelperService: UserHelperService){}
    
    //get all users
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findall();
    }

    //get one user
    @Get(':id')
    async findOne(@Param('id') id:number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if(!user){
            throw new Error('User not found');
        }else {
            return user;
        }
    }
    //create user
    // @Post()
    // async create(@Body() user:User): Promise<User> {
    //     return await this.usersService.create(user);
    // }

    //update user
    @Put(':id')
    async update (@Param('id') id: number, @Body() user: User): Promise<any> {
        return this.usersService.update(id, user);
    }
      //delete user
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
       //handle error if user does not exist
       const user = await this.usersService.findOne(id);
       if (!user) {
        throw new NotFoundException('User does not exist!');
       }
       return this.usersService.delete(id);
    }

    @Post()
    async  create(@Body() createUserDto: CreateUSerDto):Promise<UserI>{
        const userEntity: UserI = this.userHelperService.createUserDtoToEntity(createUserDto);
        return this.usersService.create(userEntity);
    }

    @Post('login')
    async  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseI> {
        const userEntity: UserI = this.userHelperService.loginUserDtoToEntity(loginUserDto);
        const jwt: string = await this.usersService.login(userEntity);
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000
        };

    }

}
