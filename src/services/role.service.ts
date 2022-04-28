import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from 'src/dto/create-role.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { RoleRepository } from 'src/repositories/role.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOneOrFail(id);
  }

  async update(
    id: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateResult> {
    return await this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.roleRepository.delete(id);
  }
}
