import { AppResource } from './../app.roles';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { EditUserDto } from './dtos/edit-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const data = await this.userService.getAllUsers();
    return { data };
  }

  @Get('/:id')
  async getOneUserByID(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('The user does not exist');
    return { user };
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Auth()
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const data = await this.userService.createUser(dto);
    return { message: 'User created successfully', data };
  }
  @Auth()
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() dto: EditUserDto) {
    const data = await this.userService.updateUser(id, dto);
    return { message: 'User updated successfully', data };
  }
  @Auth()
  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
