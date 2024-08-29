import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { TaskDtoUpdate } from './dto/task-dto-update';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Put('create')
  // @UseGuards(JwtAuthGuard)
  // create(@Body() taskDto: TaskDto, @Req() req) {
  create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @Put('edit/:id')
  edit(@Body() taskDto: TaskDtoUpdate, @Param('id') id: number) {
    return this.taskService.edit(taskDto, id);
  }

  @Get('get-all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('get/:id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }
}
