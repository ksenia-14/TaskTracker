import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/task/entities/task.entity";
import { TaskController } from './task.controller';
import { TaskSortService } from "./task-sort.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskSortService],
})

export class TaskModule { }