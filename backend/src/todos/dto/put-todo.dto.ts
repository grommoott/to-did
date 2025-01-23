import { IsBoolean, IsNumber, IsString, Min } from "class-validator";

export class PutTodoDto {
    @IsNumber()
    id: number

    @IsString()
    content: string

    @IsBoolean()
    isCompleted: boolean
}
