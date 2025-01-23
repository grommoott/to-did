import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    username: string

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(128)
    password: string
}
