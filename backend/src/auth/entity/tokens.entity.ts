import { User } from "src/users/entity/user.entity";
import { Entity, OneToOne } from "typeorm";

@Entity()
export class Tokens {
    @OneToOne(() => User)
    id: number

    refresh: string
    access: string
}
