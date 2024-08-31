import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/guard/role/roles.decorator';
import { RolesGuard } from 'src/auth/guard/role/roles.guard';
import { WorklogService } from './worklog.service';

@Controller('worklog')
export class WorklogController {
  constructor(
    private readonly worklogService: WorklogService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/:id')
  get(@Param('id') id: number) {
    return this.worklogService.getForTaskId(id)
  }
}
