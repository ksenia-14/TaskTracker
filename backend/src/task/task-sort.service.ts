import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskSortService {
  private field: string = 'createdAt';
  private order: string = 'DESC';

  setField(value: string): void {
    this.field = value
  }

  getField(): string {
    return this.field
  }

  resetFieldByDefault(): void {
    this.field = 'createdAt'
  }

  setOrder(value: string): void {
    this.order = value
  }

  resetOrderByDefault(): void {
    this.order = 'DESC'
  }

  getOrder(): string {
    return this.order
  }
}