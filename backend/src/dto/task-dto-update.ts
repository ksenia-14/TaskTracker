import { Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { User } from "src/entities/user.entity"

export class TaskDtoUpdate {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  progress: string

  @IsNotEmpty()
  createdAt: Date

  @IsNotEmpty()
  executeAt: Date

  @IsOptional()
  user: User
}
