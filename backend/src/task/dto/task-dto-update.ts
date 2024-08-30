import { Transform, TransformFnParams, Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional } from "class-validator"
import { User } from "src/user/entities/user.entity" 

export class TaskDtoUpdate {
  @IsNotEmpty({ message: 'поле id не должно быть пустым' })
  id: number

  @IsNotEmpty({ message: 'поле заголовка не должно быть пустым' })
  title: string

  @IsNotEmpty({ message: 'поле типа не должно быть пустым' })
  type: string

  @IsNotEmpty({ message: 'поле прогресса не должно быть пустым' })
  progress: number

  @IsNotEmpty({ message: 'поле даты создания не должно быть пустым' })
  @Type(() => Date)
  @IsDate({ message: 'некорректный формат даты' })
  createdAt: Date

  @IsNotEmpty({ message: 'поле срока выполнения не должно быть пустым' })
  @Type(() => Date)
  @IsDate({ message: 'некорректный формат даты' })
  executeAt: Date

  @IsNotEmpty({ message: 'поле описания не должно быть пустым' })
  description: string

  @IsOptional()
  user: string

  @IsOptional()
  admin: number
}
