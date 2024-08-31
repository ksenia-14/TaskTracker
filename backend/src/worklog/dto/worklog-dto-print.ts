import { Optional } from "@nestjs/common"
import { Expose, Type } from "class-transformer"
import { IsOptional } from "class-validator"
import { TaskDto } from "src/task/dto/task-dto"
import { TaskDtoWorklog } from "src/task/dto/task-dto-worklog"
import { Task } from "src/task/entities/task.entity"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity"

export class WorklogDtoPrint {
  @Expose()
  @Optional()
  id: number

  @Expose()
  @IsOptional()
  @Type(() => UserDto)
  user:UserDto

  @Expose()
  @Type(() => TaskDtoWorklog)
  task:TaskDtoWorklog

  @Expose()
  progress: number
}