import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { TaskDtoUpdate } from './dto/task-dto-update';
import { JwtAuthGuard } from 'src/auth/guard/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role/roles.guard';
import { Roles } from 'src/auth/guard/role/roles.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('create')
  create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('edit/:id')
  edit(@Body() taskDto: TaskDtoUpdate, @Param('id') id: number) {
    return this.taskService.edit(taskDto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('get-all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  getTaskById(@Req() req, @Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }
}
