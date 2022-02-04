import { LoginDTO } from './dtos/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
/* eslint-disable prettier/prettier */
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { User as UserEntity } from './../user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth-guards';
import { Body, Get, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorators';
import { Auth } from 'src/common/decorators/auth.decorator';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO, @User() user: UserEntity) {
    const data = await this.authService.login(user);
    return {
      message: 'Logged in successfully',
      data,
    };
  }

  @Auth()
  @Get('profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Logged in successfully',
      user,
    };
  }

  @Auth()
  @Get('refresh')
  refreshToken(@User() user: UserEntity) {
    const data = this.authService.login(user);
    return {
      message: 'Token refreshed',
      data,
    };
  }
}
