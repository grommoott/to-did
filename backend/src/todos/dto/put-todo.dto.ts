import { IsNumber } from "class-validator";

export class PutTodoDto {
    @IsNumber()
    id: number

    content: string

    isCompleted: boolean
}
