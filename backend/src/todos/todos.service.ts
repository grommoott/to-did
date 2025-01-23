import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./entity/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/entity/user.entity";
import { PutTodoDto } from "./dto/put-todo.dto";

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async createTodo(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
        const todo = new Todo()
        todo.content = createTodoDto.content
        todo.isCompleted = createTodoDto.isCompleted

        const user = await this.userRepository.findOneBy({ id: userId })

        if (user == null) {
            throw new InternalServerErrorException()
        }

        todo.user = user

        return await this.todoRepository.save(todo)
    }

    async getTodos(userId: number): Promise<Todo[]> {
        return this.todoRepository.findBy({ user: { id: userId } })
    }

    async putTodo(putTodoDto: PutTodoDto, userId: number): Promise<undefined> {
        const todo = await this.todoRepository.findOne({ relations: { user: true }, where: { id: putTodoDto.id } })

        if (todo == null) {
            throw new NotFoundException()
        }

        if (todo.user.id != userId) {
            throw new ForbiddenException()
        }

        for (const key in putTodoDto) {
            if (putTodoDto[key] == undefined) {
                continue
            }

            todo[key] = putTodoDto[key]
        }

        await this.todoRepository.save(todo)
    }

    async deleteTodo(todoId: number, userId: number): Promise<undefined> {
        const todo = await this.todoRepository.findOne({ relations: { user: true }, where: { id: todoId } })

        if (todo == null) {
            throw new NotFoundException()
        }

        if (todo.user.id != userId) {
            throw new ForbiddenException()
        }

        await this.todoRepository.remove(todo)
    }
}
