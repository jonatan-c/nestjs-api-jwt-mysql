import { EditUserDto } from './dtos/edit-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

export interface UserFindOne {
  id?: number;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('The user does not exist');
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const isEmailInDB = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (isEmailInDB) throw new BadRequestException('The email already exists');
    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async updateUser(id: number, dto: EditUserDto) {
    const userToUpdate = await this.getUserById(id);

    const editedUser = Object.assign(userToUpdate, dto);
    return await this.userRepository.save(editedUser);
  }

  async deleteUser(id: number) {
    const userToDelete = await this.getUserById(id);
    return await this.userRepository.remove(userToDelete);
  }

  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
