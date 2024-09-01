import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDtoUpdate } from './dto/task-dto-update';
import { JwtAuthGuard } from 'src/auth/guard/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role/roles.guard';
import { Roles } from 'src/auth/guard/role/roles.decorator';
import { UserRequest } from 'src/request/user-request.interface';
import { TaskDtoCreate } from './dto/task-dto-create';
import { plainToInstance } from 'class-transformer';
import { TaskDtoUpdateProgress } from './dto/task-dto-update-progress';
import { validate } from 'class-validator';
import { TaskSortService } from './task-sort.service';
import { TaskSortDto } from './dto/task-sort-dto';
import { TaskDtoFilter } from './dto/task-dto-filter';
import { TaskDto } from './dto/task-dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskSortService: TaskSortService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('create')
  create(@Req() request: UserRequest, @Body() taskDto: TaskDtoCreate) {
    const current_user = request.user as { userId: number }
    return this.taskService.create(taskDto, current_user.userId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('filter')
  async filter(
    @Req() request: UserRequest,
    @Query() query: TaskDtoFilter,
  ) {
    const current_user = request.user as { userId: number }
    const admin_id = current_user.userId
    const queryInstance = plainToInstance(TaskDtoFilter, query);
    const errors = await validate(queryInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    console.log('LOG')
    console.log(queryInstance)
    return this.taskService.filter(queryInstance, admin_id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('sort')
  async sortSet(
    @Body() sortDto: TaskSortDto,
  ) {
    this.taskSortService.setField(sortDto.field)
    this.taskSortService.setOrder(sortDto.order)
    return { 'field': this.taskSortService.getField(), 'order': this.taskSortService.getOrder() }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('sort')
  async sortGet() {
    return { 'field': this.taskSortService.getField(), 'order': this.taskSortService.getOrder() }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('subtask/:parent_task_id')
  async editSubtasks(
    @Req() request: UserRequest,
    @Body('subtask_id_array') subtask_id_array: number[],
    @Param('parent_task_id') parent_task_id: number,
  ) {
    const current_user = request.user as { userId: number };
    const admin_id = current_user.userId;

    const parentTask = await this.taskService.getTaskForAdminById(admin_id, parent_task_id);
    if (!parentTask) {
      throw new NotFoundException(`Задача с id: ${parent_task_id} не найдена или недоступна`);
    }
    this.taskService.removeSubtasks(parent_task_id)

    for (const subtask_id of subtask_id_array) {
      const subtask = await this.taskService.getTaskForAdminById(admin_id, subtask_id);

      if (!subtask) {
        throw new NotFoundException(`Задача с id: ${subtask_id} не найдена или недоступна`);
      }

      await this.taskService.addSubtask(subtask_id, parent_task_id);
    }
    return parentTask;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Put('edit/:id')
  async edit(@Req() request: UserRequest, @Body() taskDto: TaskDtoUpdate | TaskDtoUpdateProgress, @Param('id') id: number) {
    const current_user = request.user as { userId: number, roles: string[] }
    const roles = current_user.roles

    const taskEdit = await this.taskService.getTaskById(id)
    let task: TaskDtoUpdate | TaskDtoUpdateProgress

    if (roles.includes('admin')) {
      if (current_user.userId !== taskEdit.admin.id) {
        throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
      }
      task = plainToInstance(TaskDtoUpdate, taskDto)
    } else {
      if (current_user.userId !== taskEdit.user.id) {
        throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
      }
      task = plainToInstance(TaskDtoUpdateProgress, taskDto)
    }
    const errors = await validate(task);

    if (errors.length > 0) {
      const errorsStr = errors.map(error => {
        const constraints = Object.values(error.constraints || {});
        return constraints.join(', ');
      }).join(', ');
      throw new BadRequestException(errorsStr);
    }

    return this.taskService.edit(taskDto, id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Req() request: UserRequest, @Param('id') id: number) {
    const current_user = request.user as { userId: number }
    const taskEdit = await this.taskService.getTaskById(id)
    if (current_user.userId !== taskEdit.admin.id) {
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
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
      return this.taskService.getTaskForUserById(user.userId, id)
    }
    return this.taskService.getTaskForAdminById(user.userId, id)
  }
}
