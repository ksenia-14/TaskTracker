import { Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoUpdateProgress {
  @IsNotEmpty({ message: 'поле прогресса не должно быть пустым' })
  progress: number
}
