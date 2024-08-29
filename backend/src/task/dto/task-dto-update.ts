import { Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoUpdate {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  progress: number

  @IsNotEmpty()
  createdAt: Date

  @IsNotEmpty()
  executeAt: Date

  @IsNotEmpty()
  description: string

  @IsOptional()
  user: string
}
