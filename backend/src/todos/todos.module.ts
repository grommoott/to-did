import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entity/todo.entity";
import { User } from "src/users/entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Todo, User])],
    providers: [TodosService, JwtService],
    controllers: [TodosController]
})
export class TodosModule { }

