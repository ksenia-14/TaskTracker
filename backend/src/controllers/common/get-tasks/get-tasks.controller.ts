import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { TaskDto } from 'src/dto/task-dto';
import { TaskDtoUpdate } from 'src/dto/task-dto-update';
import { TaskService } from 'src/services/task.service';

@Controller()
export class GetTasksController {
  constructor(private readonly taskService: TaskService) {}

  @Put('create-task')
  // @UseGuards(JwtAuthGuard)
  // create(@Body() taskDto: TaskDto, @Req() req) {
  create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @Put('edit-task/:id')
  edit(@Body() taskDto: TaskDtoUpdate, @Param('id') id: number) {
    return this.taskService.edit(taskDto, id);
  }

  @Get('get-tasks')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('get-task/:id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }
}
