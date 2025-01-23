import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HashService } from "src/helpers/hash/hash.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule, AuthModule],
    providers: [UsersService, HashService],
    controllers: [UsersController]
})
export class UsersModule { }
