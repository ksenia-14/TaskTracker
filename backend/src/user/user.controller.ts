import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role/roles.guard';
import { Roles } from 'src/auth/guard/role/roles.decorator';
import { UserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('users-list')
  getListUsers() {
    return this.userService.getUsersList()
  }
}
