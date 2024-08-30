import { Expose } from "class-transformer"
import { IsOptional } from "class-validator"
import { TransformStringToDate } from "src/decorators/transform-string-to-date.decorator"

export class TaskDtoFilter {
  @Expose()
  @IsOptional()
  type?: string

  @Expose()
  @IsOptional()
  progress?: number | string

  @Expose()
  @IsOptional()
  @TransformStringToDate()
  createdAt?: Date | string

  @Expose()
  @IsOptional()
  executeAt?: Date | string

  @Expose()
  @IsOptional()
  user_id?: number | string

  @IsOptional()
  field_sort?: string

  @IsOptional()
  order_sort?: string
}
