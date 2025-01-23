import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entity/user.entity";
import { Tokens } from "./auth/entity/tokens.entity";
import { AuthModule } from "./auth/auth.module";
import { TodosModule } from "./todos/todos.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Todo } from "./todos/entity/todo.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                database: configService.get("DB_DATABASE"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                entities: [User, Tokens, Todo],
                logging: true,
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get("JWT_SECRET")
            }),
            inject: [ConfigService]
        }),
        AuthModule,
        TodosModule,
        UsersModule
    ],
})
export class AppModule { }
