import { Module } from '@nestjs/common';
import { WorklogService } from './worklog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worklog } from './entities/worklog.entity';
import { WorklogController } from './worklog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Worklog])],
  controllers: [WorklogController],
  providers: [WorklogService]
})
export class WorklogModule {}
