import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tokens } from "./entity/tokens.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/users/entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([Tokens, User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET")
            }),
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports: [AuthGuard]
})
export class AuthModule { }
