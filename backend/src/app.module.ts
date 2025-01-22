import { Module } from "@nestjs/common";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { TodosController } from "./todos/todos.controller";
import { TodosService } from "./todos/todos.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";

@Module({
    controllers: [UsersController, TodosController, AuthController],
    providers: [UsersService, TodosService, AuthService]
})
export class AppModule { }
