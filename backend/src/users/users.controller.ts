import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { IUser } from "./interfaces/user.interface";
import { AuthGuard } from "src/auth/auth.guard";
import { validate } from "class-validator";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const errors = await validate(createUserDto)

        if (errors.length > 0) {
            throw new BadRequestException()
        }

        this.usersService.createUser(createUserDto)
    }

    @UseGuards(AuthGuard)
    @Get()
    async get(@Req() req: Request): Promise<IUser> {
        const user = await this.usersService.getUser(Number(req["user"].id))

        return {
            id: user.id,
            username: user.username
        }
    }
}
