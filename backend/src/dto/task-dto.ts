import { Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { User } from "src/entities/user.entity"

export class TaskDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  progress: string

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toISOString().split('T')[0])
  createdAt: string

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toISOString().split('T')[0])
  executeAt: string

  @IsOptional()
  user: User
}
