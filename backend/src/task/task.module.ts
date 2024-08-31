import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/task/entities/task.entity";
import { TaskController } from './task.controller';
import { TaskSortService } from "./task-sort.service";
import { WorklogService } from "src/worklog/worklog.service";
import { WorklogModule } from "src/worklog/worklog.module";
import { Worklog } from "src/worklog/entities/worklog.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, Worklog])],
  controllers: [TaskController],
  providers: [TaskService, TaskSortService, WorklogService],
})

export class TaskModule { }