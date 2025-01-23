import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodosService } from "./todos.service";
import { AuthGuard } from "src/auth/auth.guard";
import { ITodo } from "./interfaces/todo.interface";
import { PutTodoDto } from "./dto/put-todo.dto";

@Controller("todos")
export class TodosController {
    constructor(private todosService: TodosService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createTodoDto: CreateTodoDto, @Req() req: Request): Promise<ITodo> {
        const todo = await this.todosService.createTodo(createTodoDto, req["user"].id)

        return {
            id: todo.id,
            content: todo.content,
            isCompleted: todo.isCompleted
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async get(@Req() req: Request): Promise<ITodo[]> {
        const todos = await this.todosService.getTodos(req["user"].id)

        return todos.map((todo) => ({
            id: todo.id,
            content: todo.content,
            isCompleted: todo.isCompleted
        }))
    }

    @UseGuards(AuthGuard)
    @Put()
    async put(@Req() req: Request, @Body() putTodoDto: PutTodoDto) {
        await this.todosService.putTodo(putTodoDto, req["user"].id)
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Req() req: Request, @Param("id") id: string) {
        await this.todosService.deleteTodo(+id, req["user"].id)
    }
}
