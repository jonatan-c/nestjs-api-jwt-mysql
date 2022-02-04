import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail({ email });

    console.log(user);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };
    return {
      ...rest,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
