import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodosService } from "./todos.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ITodo } from "./interfaces/todo.interface";

@Controller("todos")
export class TodosController {
    constructor(private todosService: TodosService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request): Promise<ITodo> {
        const todo = await this.todosService.createTodo(createTodoDto, req["user"].id)

        return {
            content: todo.content,
            isCompleted: todo.isCompleted
        }
    }
}
