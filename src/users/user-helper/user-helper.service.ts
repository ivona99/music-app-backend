import { Injectable } from '@nestjs/common';
import { CreateUSerDto } from '../dto/create-user.dto';
import { UserI } from '../user.interface';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserHelperService {
    //converting a CreateUserDto object to a UserI object.
    createUserDtoToEntity(createUSerDto: CreateUSerDto): UserI {
        return{
            user_name:createUSerDto.user_name,
            user_email: createUSerDto.user_email,
            user_password: createUSerDto.user_password
        };
    }

    loginUserDtoToEntity(loginUserDto: LoginUserDto): UserI {
        return {
            user_email: loginUserDto.user_email,
            user_password: loginUserDto.user_password
        };
    }
}
