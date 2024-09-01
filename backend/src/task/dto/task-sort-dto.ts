import { IsString, IsIn } from 'class-validator';

export class TaskSortDto {
  @IsString()
  @IsIn(['type', 'user', 'progress', 'createdAt', 'executeAt'])
  field: 'type' | 'user' | 'progress' | 'createdAt' | 'executeAt'

  @IsString()
  @IsIn(['ASC', 'DESC'])
  order: 'ASC' | 'DESC'
}