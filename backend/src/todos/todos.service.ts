import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./entity/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/entity/user.entity";

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
}
