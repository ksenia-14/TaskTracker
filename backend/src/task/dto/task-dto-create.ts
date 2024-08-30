import { Expose, Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { UserDto } from "src/user/dto/user-dto"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoCreate {
  @Expose()
  @IsNotEmpty({ message: 'поле заголовка не должно быть пустым' })
  title: string

  @Expose()
  @IsNotEmpty({ message: 'поле типа не должно быть пустым' })
  type: string

  @Expose()
  @IsNotEmpty({ message: 'поле прогресса не должно быть пустым' })
  progress: number

  @Expose()
  @IsNotEmpty({ message: 'поле описания не должно быть пустым' })
  description: string

  @Expose()
  @IsOptional()
  createdAt: Date

  @Expose()
  @IsNotEmpty({ message: 'поле даты не должно быть пустым' })
  @Type(() => Date)
  @IsDate({ message: 'некорректный формат даты' })
  executeAt: Date

  @Expose()
  @IsOptional()
  user: number

  @Expose()
  @IsOptional()
  admin: number
}
