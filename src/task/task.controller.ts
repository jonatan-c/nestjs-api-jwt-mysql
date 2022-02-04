import { Auth } from 'src/common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { EditTaskDTO } from './dtos/edit-task.dto';
import { TaskService } from './task.service';
/* eslint-disable prettier/prettier */
import { CreateTaskDTO } from './dtos/create-task.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }

  @Get('/:id')
  async getOneTask(id: number) {
    return await this.taskService.getTaskById(id);
  }

  @Auth()
  @Post()
  async createTask(@Body() createtaskDTO: CreateTaskDTO) {
    return await this.taskService.createTask(createtaskDTO);
  }

  @Auth()
  @Put('/:id')
  async updateTask(
    @Res() res,
    @Param('id') id: number,
    @Body() editTask: EditTaskDTO,
  ) {
    const task = await this.taskService.updateTask(id, editTask);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been successfully updated',
      task,
    });
  }

  @Auth()
  @Delete('/:id')
  async deleteTask(@Res() res, @Param('id') id: number) {
    const task = await this.taskService.deleteTask(id);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been deleted',
      task,
    });
  }
}
