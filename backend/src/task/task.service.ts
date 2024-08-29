import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { TaskDto } from "src/task/dto/task-dto";
import { TaskDtoUpdate } from "src/task/dto/task-dto-update";
import { Task } from "src/task/entities/task.entity";
import { Repository } from "typeorm";
import { TaskDtoCreate } from "./dto/task-dto-create";
import { UserService } from "src/user/user.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  async create(taskDto: TaskDtoCreate) {
    const isExist = await this.taskRepository.findBy({
      user: { id: taskDto.user },
      title: taskDto.title
    })
    if (isExist.length)
      throw new BadRequestException('Задача с таким названием уже назначена этому пользователю')

    taskDto.createdAt = new Date()
    const newTask = plainToInstance(Task, taskDto)
    const task = await this.taskRepository.save(newTask)

    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async edit(taskDto: TaskDtoUpdate, id: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['user']
    });

    if (!existingTask) {
      throw new BadRequestException(`Задачи с id: ${id} не существует`);
    }

    const updatedTask = plainToInstance(Task, { ...existingTask, ...taskDto });

    await this.taskRepository.save(updatedTask);

    const savedTask = await this.taskRepository.findOne({ where: { id }, relations: ['user'] })
    return plainToInstance(TaskDto, savedTask, { excludeExtraneousValues: true });
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find({ relations: ['user'] });
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getAllTasksForUserId(user_id: number): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find({
      where: {
        user: { id: user_id }
      }
    })
    return plainToInstance(TaskDto, tasks, { excludeExtraneousValues: true });
  }

  async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user'] });
    return plainToInstance(TaskDto, task, { excludeExtraneousValues: true });
  }

  async getTaskForUserById(user_id: number, task_id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({
      where: {
        id: task_id,
        user: { id: user_id }
      },
      relations: ['user']
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