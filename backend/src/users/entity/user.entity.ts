import { Todo } from "src/todos/entity/todo.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    username: string

    @Column({ type: "varchar", length: 72, name: "password_hash" })
    passwordHash: string

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]
}
