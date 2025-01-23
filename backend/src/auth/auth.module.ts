import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tokens } from "./entity/tokens.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/users/entity/user.entity";
import { AuthGuard } from "./auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Tokens, User]), JwtModule, ConfigModule],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthGuard]
})
export class AuthModule { }
