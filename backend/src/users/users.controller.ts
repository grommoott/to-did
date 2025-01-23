import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { IUser } from "./interfaces/user.interface";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.createUser(createUserDto)
    }

    @Get(":id")
    async get(@Param("id") id: string): Promise<IUser> {
        return this.usersService.getUser(Number(id))
    }
}
