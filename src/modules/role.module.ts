import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from 'src/repositories/role.repository';
import { RoleService } from 'src/services/role.service';
import { RoleController } from '../controllers/acl/role.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([RoleRepository])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
