import { Module } from "@nestjs/common";
import { GetTasksController } from "../controllers/common/get-tasks/get-tasks.controller";
import { TaskService } from "src/services/task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [GetTasksController],
  providers: [TaskService],
})

export class TasksModule { }