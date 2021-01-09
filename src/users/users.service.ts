import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/public/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(userDto);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with "${id}" not found`);
    }
  }

  async updateUser(id: number, userDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, userDto);
  }
}
