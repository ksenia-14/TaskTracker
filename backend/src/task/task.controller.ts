import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { TaskDtoUpdate } from './dto/task-dto-update';
import { JwtAuthGuard } from 'src/auth/guard/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role/roles.guard';
import { Roles } from 'src/auth/guard/role/roles.decorator';
import { UserRequest } from 'src/request/user-request.interface';
import { TaskDtoCreate } from './dto/task-dto-create';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('create')
  create(@Body() taskDto: TaskDtoCreate) {
    return this.taskService.create(taskDto)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('edit/:id')
  edit(@Body() taskDto: TaskDtoUpdate, @Param('id') id: number) {
    return this.taskService.edit(taskDto, id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.taskService.deleteTaskById(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('get-all')
  getAllTasks(@Req() request: UserRequest) {
    const user = request.user as { userId: number, roles: string[] }
    const roleUser = user.roles
    if (roleUser.includes('admin')) {
      return this.taskService.getAllTasks()
    } else {
      return this.taskService.getAllTasksForUserId(user.userId)
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('get/:id')
  getTaskById(@Req() request: UserRequest, @Param('id') id: number) {
    const user = request.user as { userId: number, roles: string[] }
    const roleUser = user.roles
    if (!roleUser.includes('admin')) {
      this.taskService.getTaskForUserById(user.userId, id)
    }
    return this.taskService.getTaskById(id)
  }
}
