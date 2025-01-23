import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tokens } from "./entity/tokens.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/users/entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Tokens, User])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
