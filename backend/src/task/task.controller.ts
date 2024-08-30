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
  create(@Req() request: UserRequest, @Body() taskDto: TaskDtoCreate) {
    const current_user = request.user as { userId: number}
    return this.taskService.create(taskDto, current_user.userId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('edit/:id')
  async edit(@Req() request: UserRequest, @Body() taskDto: TaskDtoUpdate, @Param('id') id: number) {
    const current_user = request.user as { userId: number}
    const taskEdit = await this.taskService.getTaskById(id)
    if (current_user.userId !== taskEdit.admin.id) {
      return {'error': 'Not access'}
    }
    return this.taskService.edit(taskDto, id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Req() request: UserRequest, @Param('id') id: number) {
    const current_user = request.user as { userId: number}
    const taskEdit = await this.taskService.getTaskById(id)
    if (current_user.userId !== taskEdit.admin.id) {
      return {'error': 'Not access'}
    }
    return this.taskService.deleteTaskById(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Get('get-all')
  getAllTasks(@Req() request: UserRequest) {
    const user = request.user as { userId: number, roles: string[] }
    const roleUser = user.roles
    if (roleUser.includes('admin')) {
      return this.taskService.getAllTasksForAdminId(user.userId)
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
    return this.taskService.getTaskForAdminById(user.userId, id)
  }
}
