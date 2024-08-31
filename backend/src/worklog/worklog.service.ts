import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Worklog } from './entities/worklog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WorklogDto } from './dto/worklog-dto';
import { plainToInstance } from 'class-transformer';
import { Task } from 'src/task/entities/task.entity';
import { WorklogDtoPrint } from './dto/worklog-dto-print';

@Injectable()
export class WorklogService {
  constructor(
    @InjectRepository(Worklog)
    private readonly worklogRepository: Repository<Worklog>,
  ) { }

  async create(task: Task) {
    if (task.user.id === null) return
    console.log(task)
    console.log(task.progress)

    let newWorklogDto = new WorklogDto()
    newWorklogDto.progress = task.progress
    newWorklogDto.task = task
    newWorklogDto.user = task.user

    console.log(newWorklogDto)

    const newWorklog = plainToInstance(Worklog, newWorklogDto)

    const worklog = await this.worklogRepository.save(newWorklog)
    return worklog
  }

  async getForTaskId(task_id: number) {
    const findOptions: any = {
      where: {
        task: { id: task_id }
      },
      relations: ['user', 'task'],
      order: {
        id: 'DESC'
      }
    };

    const worklog = await this.worklogRepository.find(findOptions);

    const worklogDtos = worklog.map(log => {
      return plainToInstance(WorklogDtoPrint, log, { excludeExtraneousValues: true });
    });

    return worklogDtos;
  }
}
