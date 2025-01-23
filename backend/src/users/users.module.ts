import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HashService } from "src/helpers/hash/hash.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, HashService],
    controllers: [UsersController]
})
export class UsersModule { }
