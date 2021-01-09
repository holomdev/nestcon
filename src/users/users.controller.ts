import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/public/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }
}
