import { Expose, Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoCreate {
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
  createdAt: Date

  @Expose()
  @IsNotEmpty()
  executeAt: Date

  @Expose()
  @IsOptional()
  user: number

  @Expose()
  @IsNotEmpty()
  admin: number
}
