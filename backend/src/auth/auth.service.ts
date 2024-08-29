import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, username: user.login, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
