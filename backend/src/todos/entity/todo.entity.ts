import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    content: string

    @Column("boolean")
    isCompleted: boolean

    @ManyToOne(() => User, (user) => user.todos)
    user: User
}
