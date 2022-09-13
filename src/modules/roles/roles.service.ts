import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      // create role
      const role = await this.roleRepository.create(createRoleDto);
      // save role
      return await this.roleRepository.save(role);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Role already exist.');
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Role> {
    // find role from database
    const user: Role = await this.roleRepository.findOne({
      where: { id },
    });
    // throw error if role not found
    if (!user) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    // return if exists
    return user;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      // update role
      const response: UpdateResult = await this.roleRepository.update(+id, updateRoleDto);
      if (response.affected === 0) {
        throw new NotFoundException(`Role with id ${id} not found`);
      }
      // return update result
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // throw if error come from database (duplicate entry)
        throw new ConflictException('Role already exist.');
      } else {
        // throw if error come from server
        throw new HttpException(error.message, error.status || 500);
      }
    }
  }

  async remove(id: number) {
    // remove role
    const response: DeleteResult = await this.roleRepository.delete(+id);
    // throw error if role not found
    if (response.affected === 0) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    // return if exists
    return 'Role deleted successfully';
  }
}
