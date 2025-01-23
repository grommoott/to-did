import { IsBoolean, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    content: string

    @IsBoolean()
    isCompleted: boolean
}
