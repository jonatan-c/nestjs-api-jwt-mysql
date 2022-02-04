import { EditTaskDTO } from './dtos/edit-task.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async createTask(task: CreateTaskDTO) {
    const post = this.taskRepository.create(task);
    return await this.taskRepository.save(post);
  }

  async updateTask(id: number, editTask: EditTaskDTO) {
    const taskSelect = await this.getTaskById(id);
    if (!taskSelect)
      throw new NotFoundException(`Task with id ${id} not found`);
    const editTask2 = Object.assign(taskSelect, editTask);
    return await this.taskRepository.save(editTask2);
  }

  async deleteTask(id: number): Promise<Task> {
    const taskSelect = await this.getTaskById(id);
    return await this.taskRepository.remove(taskSelect);
  }
}
