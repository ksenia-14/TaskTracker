import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { TaskDto } from "src/task/dto/task-dto";
import { TaskDtoUpdate } from "src/task/dto/task-dto-update";
import { Task } from "src/task/entities/task.entity";
import { Repository } from "typeorm";
import { TaskDtoCreate } from "./dto/task-dto-create";
import { TaskDtoUpdateProgress } from "./dto/task-dto-update-progress";
import { TaskDtoFilter } from "./dto/task-dto-filter";
import { TaskSortService } from "./task-sort.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskSortService: TaskSortService,
  ) { }

  async create(taskDto: TaskDtoCreate, id_admin: number) {
    const isExist = await this.taskRepository.findBy({
      user: { id: taskDto.user },
      title: taskDto.title
    })
    if (isExist.length)
      throw new BadRequestException('Задача с таким названием уже назначена этому пользователю')

    taskDto.createdAt = new Date()
    taskDto.progress = 0
    taskDto.admin = id_admin

    const newTask = plainToInstance(Task, taskDto)
    const task = await this.taskRepository.save(newTask)

    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async edit(taskDto: TaskDtoUpdate | TaskDtoUpdateProgress, id: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['user']
    });

    if (!existingTask) {
      throw new BadRequestException(`Задачи с id: ${id} не существует`);
    }

    const updatedTask: Task = plainToInstance(Task, { ...existingTask, ...taskDto });
    await this.taskRepository.save(updatedTask);

    const savedTask = await this.taskRepository.findOne({ where: { id }, relations: ['user', 'admin'] })
    return plainToInstance(TaskDto, savedTask, { excludeExtraneousValues: true });
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const sortBy = this.taskSortService.getField()
    const sortOrder = this.taskSortService.getOrder()

    const findOptions: any = {
      relations: ['user', 'admin'],
      order: {
        [sortBy]: sortOrder
      }
    }

    const tasks = await this.taskRepository.find(findOptions);
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getAllTasksForUserId(user_id: number): Promise<TaskDto[]> {
    const sortBy = this.taskSortService.getField()
    const sortOrder = this.taskSortService.getOrder()

    const findOptions: any = {
      where: {
        user: { id: user_id }
      },
      relations: ['user', 'admin'],
      order: {
        [sortBy]: sortOrder
      }
    }

    const tasks = await this.taskRepository.find(findOptions)
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getAllTasksForAdminId(admin_id: number): Promise<TaskDto[]> {
    const sortBy = this.taskSortService.getField()
    const sortOrder = this.taskSortService.getOrder()

    const findOptions: any = {
      where: {
        admin: { id: admin_id }
      },
      relations: ['user', 'admin'],
      order: {
        [sortBy]: sortOrder
      }
    }
  
    const tasks = await this.taskRepository.find(findOptions);
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user', 'admin'] });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async filter(dto: TaskDtoFilter, admin_id: number) {
    const where: any = {
      admin: { id: admin_id },
    };

    if (dto.type !== '') {
      where.type = dto.type;
    }

    if (dto.user_id !== '') {
      where.user = { id: dto.user_id };
    }

    if (dto.progress !== '') {
      where.progress = dto.progress;
    }

    if (dto.createdAt !== '') {
      where.createdAt = dto.createdAt;
    }

    if (dto.executeAt !== '') {
      where.executeAt = dto.executeAt;
    }

    const tasks = await this.taskRepository.find({
      where,
      relations: ['user', 'admin'],
    });

    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getTaskForUserById(user_id: number, task_id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: {
        id: task_id,
        user: { id: user_id }
      },
      relations: ['user', 'admin']
    });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async getTaskForAdminById(admin_id: number, task_id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: {
        id: task_id,
        admin: { id: admin_id }
      },
      relations: ['user', 'admin']
    });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async deleteTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Задача с id: ${id} не найдена`);
    }
    await this.taskRepository.remove(task);
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

}