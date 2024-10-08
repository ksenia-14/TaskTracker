import { Optional } from "@nestjs/common"
import { Expose, Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoWorklog {
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
}
