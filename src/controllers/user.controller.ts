import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import RoleGuard from 'src/acl/role.guard';
import Role from 'src/enums/role.enum';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@UsePipes(ValidationPipe)
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Patch(':id')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(LocalAuthGuard)
  @UseGuards(RoleGuard(Role.Administrator))
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
