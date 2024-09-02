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
import { WorklogService } from "src/worklog/worklog.service";
import { TaskType } from "./enum/task-type.enum";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskSortService: TaskSortService,
    private readonly worklogService: WorklogService,
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

    await this.worklogService.create(task)

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

    const oldProgress = existingTask.progress
    const oldType = existingTask.type

    let updatedTask = plainToInstance(Task, { ...existingTask, ...taskDto });

    if (oldProgress != updatedTask.progress) {
      await this.worklogService.create(updatedTask)
    }
    if (oldType != updatedTask.type) {
      updatedTask.subtask = []
    }

    await this.taskRepository.save(updatedTask);

    const savedTask = await this.taskRepository.findOne(
      { where: { id }, 
      relations: ['user', 'admin', 'subtask', 'subtask_of'] 
    })
    return plainToInstance(TaskDto, savedTask, { excludeExtraneousValues: true });
  }

  async removeSubtasks(parent_task_id:number) {
    const parentTask = await this.taskRepository.findOne({ where: { id: parent_task_id }})
    if (!parentTask) {
      throw new NotFoundException(`Задача с id: ${parent_task_id} не найдена`);
    }
    parentTask.subtask = []
    await this.taskRepository.save(parentTask);
  }

  async addSubtask(subtask_id: number, parent_task_id:number) {
    const subtask = await this.taskRepository.findOne({ where: { id: subtask_id }})
    const parentTask = await this.taskRepository.findOne({ where: { id: parent_task_id }})

    if (!subtask) {
      throw new NotFoundException(`Задача с id: ${subtask_id} не найдена`);
    }
    if (!parentTask) {
      throw new NotFoundException(`Задача с id: ${parent_task_id} не найдена`);
    }

    this.checkHierarchy(parentTask, subtask)

    subtask.subtask_of = parentTask
    await this.taskRepository.save(subtask);

    const subtaskSaved = await this.taskRepository.findOne(
      { where: { id: subtask_id }, 
      relations: ['user', 'admin', 'subtask', 'subtask_of'] 
    })
    return plainToInstance(TaskDto, subtaskSaved, { excludeExtraneousValues: true });
  }

  checkHierarchy(parentTask: Task, subtask: Task) {
    if (parentTask.type === TaskType.TASK) {
      throw new BadRequestException(`Задачи типа Task не могут иметь подзадач`)
    } else if (parentTask.type === TaskType.EPIC) {
      if (subtask.type !== TaskType.TASK) 
        throw new BadRequestException(`Задачи типа Epic не могут иметь подзадач типа ${subtask.type}`)
    } else if (parentTask.type === TaskType.MILESTONE) {
      if (subtask.type !== TaskType.EPIC)
        throw new BadRequestException(`Задачи типа Milestone не могут иметь подзадач типа ${subtask.type}`)
    } else {
      throw new BadRequestException(`Тип задачи ${parentTask.type} не существует`)
    }
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const sortBy = this.taskSortService.getField()
    const sortOrder = this.taskSortService.getOrder()

    const findOptions: any = {
      relations: ['user', 'admin', 'subtask', 'subtask_of'],
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
      relations: ['user', 'admin', 'subtask', 'subtask_of'],
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
      relations: ['user', 'admin', 'subtask', 'subtask_of'],
      order: {
        [sortBy]: sortOrder
      }
    }

    const tasks = await this.taskRepository.find(findOptions);
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ 
      where: { id }, 
      relations: ['user', 'admin', 'subtask', 'subtask_of'] 
    });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async filter(dto: TaskDtoFilter, admin_id: number) {
    const sortBy = this.taskSortService.getField()
    const sortOrder = this.taskSortService.getOrder()

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
      relations: ['user', 'admin', 'subtask', 'subtask_of'] ,
      order: {
        [sortBy]: sortOrder
      }
    });

    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getTaskForUserById(user_id: number, task_id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: {
        id: task_id,
        user: { id: user_id }
      },
      relations: ['user', 'admin', 'subtask', 'subtask_of']
    });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async getTaskForAdminById(admin_id: number, task_id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: {
        id: task_id,
        admin: { id: admin_id }
      },
      relations: ['user', 'admin', 'subtask', 'subtask_of']
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