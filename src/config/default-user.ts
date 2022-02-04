/* eslint-disable prettier/prettier */
import { User } from './../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', { email: config.get('DEFAULT_USER_EMAIL') })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      email: config.get('DEFAULT_USER_EMAIL'),
      password: config.get('DEFAULT_USER_PASSWORD'),
      roles: ['ADMIN'],
    });

    return await userRepository.save(adminUser);
  }
};
