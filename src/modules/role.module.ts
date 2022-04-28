import { Module } from '@nestjs/common';
import { RoleService } from 'src/services/role.service';
import { RoleController } from '../controllers/acl/role.controller';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
