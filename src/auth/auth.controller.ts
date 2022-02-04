import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { AuthGuard } from '@nestjs/passport';
/* eslint-disable prettier/prettier */
import { User as UserEntity } from './../user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth-guards';
import { Get, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorators';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard, JwtAuthGuard)
  @Post('login')
  login(@User() user: UserEntity) {
    return user;
  }

  @Get('profile')
  profile() {
    return 'profile';
  }
}
