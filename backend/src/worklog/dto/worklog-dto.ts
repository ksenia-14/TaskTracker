import { Optional } from "@nestjs/common"
import { Expose, Type } from "class-transformer"
import { IsOptional } from "class-validator"
import { Task } from "src/task/entities/task.entity"
import { User } from "src/user/entities/user.entity"

export class WorklogDto {
  @Expose()
  @Optional()
  id: number

  @Expose()
  @IsOptional()
  @Type(() => User)
  user:User

  @Expose()
  @Type(() => Task)
  task:Task

  @Expose()
  progress: number
}