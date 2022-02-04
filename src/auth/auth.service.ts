import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail({ email });

    console.log(user);

    if (user && (await compare(pass, user.password))) {
      return user;
    }

    return null;
  }
}
