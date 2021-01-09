import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TasksModule, TenancyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
