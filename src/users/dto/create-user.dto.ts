import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class CreateUSerDto extends LoginUserDto {
    @IsString()
    @IsNotEmpty()
    user_name: string;

}