import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findUserByLogin(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { login: login },
    });
  }

  async findUserByName(name: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { name: name },
    });
  }

  async getUsersList(): Promise<UserDto[]> {
    const role = 'user'
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.roles LIKE :role', { role: `%${role}%` })
      .getMany();

    return users.map(user => plainToInstance(UserDto, user, { excludeExtraneousValues: true }));
  }
}
