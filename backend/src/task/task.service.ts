import { BadRequestException, Injectable, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { TaskDto } from "src/task/dto/task-dto";
import { TaskDtoUpdate } from "src/task/dto/task-dto-update";
import { Task } from "src/task/entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
@UsePipes(new ValidationPipe({ transform: true }))
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  async create(taskDto: TaskDto) {
    const isExist = await this.taskRepository.findBy({
      user: taskDto.user,
      title: taskDto.title
    })
    if (isExist.length)
      throw new BadRequestException('Задача с таким названием уже назначена этому пользователю')

    const newTask = plainToInstance(Task, taskDto)
    const task = await this.taskRepository.save(newTask)
    return plainToInstance(TaskDto, task);
  }

  async edit(taskDto: TaskDtoUpdate, id: number) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
    });

    if (!existingTask) {
      throw new BadRequestException(`Задачи с id: ${id} не существует`);
    }

    const updatedTask = plainToInstance(Task, { ...existingTask, ...taskDto });

    const savedTask = await this.taskRepository.save(updatedTask);

    return plainToInstance(TaskDtoUpdate, savedTask);
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.find();
    return plainToInstance(TaskDto, tasks);
  }

  async getTaskById(id: number): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id } });
    return plainToInstance(TaskDto, task);
  }

}