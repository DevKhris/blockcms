import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import RoleGuard from 'src/acl/role.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import Role from 'src/enums/role.enum';
import { RoleService } from 'src/services/role.service';

@UsePipes(ValidationPipe)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
