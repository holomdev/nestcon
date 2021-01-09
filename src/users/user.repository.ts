import { Inject, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/public/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: CreateUserDto): Promise<User> {
    const { name, lastName, password } = userDto;
    try {
      const user = new User();
      user.name = name;
      user.lastName = lastName;
      user.password = password;

      return await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async updateUser(id: number, userDto: UpdateUserDto): Promise<User> {
    const { name, lastName } = userDto;
    try {
      const user = await this.findOne(id);
      if (name) {
        user.name = name;
      }

      if (lastName) {
        user.lastName = lastName;
      }

      return await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
