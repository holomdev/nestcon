import { Global, Module } from '@nestjs/common';
import { connectionFactory } from './connection.provider';

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
