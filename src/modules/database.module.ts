import { Module } from '@nestjs/common';
import { DatabaseProvider } from 'src/providers/database.provider';


@Module({
  imports: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
