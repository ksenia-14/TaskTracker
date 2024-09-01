import { Optional } from "@nestjs/common"
import { Expose, Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity" 
import { Task } from "../entities/task.entity"

export class TaskDtoSubtask {
  @Expose()
  @IsNotEmpty()
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
  @IsOptional()
  @Type(() => UserDto)
  user: UserDto
}
