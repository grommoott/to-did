import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Todo } from "./entity/todo.entity";
import { User } from "src/users/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([Todo, User]), AuthModule, ConfigModule],
    providers: [TodosService, JwtService],
    controllers: [TodosController]
})
export class TodosModule { }

