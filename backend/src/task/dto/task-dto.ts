import { Optional } from "@nestjs/common"
import { Expose, Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity" 
import { Task } from "../entities/task.entity"
import { TaskDtoSubtask } from "./task-dto-subtask"

export class TaskDto {
  @Expose()
  @Optional()
  id: number

  @Expose()
  @IsNotEmpty()
  title: string

  @Expose()
  @IsNotEmpty()
  type: string

  @Expose()
  @IsNotEmpty()
  progress: number

  @Expose()
  @IsNotEmpty()
  description: string

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toISOString().split('T')[0])
  createdAt: string

  @Expose()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toISOString().split('T')[0])
  executeAt: string

  @Expose()
  @Type(() => UserDto)
  user: UserDto

  @Expose()
  @IsNotEmpty()
  @Type(() => UserDto)
  admin: UserDto

  @Expose()
  @IsOptional()
  @Type(() => TaskDtoSubtask)
  subtask: TaskDtoSubtask[];

  @Expose()
  @IsOptional()
  @Type(() => TaskDtoSubtask)
  subtask_of: TaskDtoSubtask;
}
