import { Module } from "@nestjs/common";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { TodosController } from "./todos/todos.controller";
import { TodosService } from "./todos/todos.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entity/user.entity";
import { Tokens } from "./auth/entity/tokens.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: [User, Tokens]
        })
    ],
    controllers: [UsersController, TodosController, AuthController],
    providers: [UsersService, TodosService, AuthService]
})
export class AppModule { }
