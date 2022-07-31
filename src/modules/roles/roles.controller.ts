import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @ApiOperation({ summary: 'Get all roles', description: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }


  @ApiOperation({ summary: 'Create role', description: 'Create role' })
  @ApiResponse({ status: 201, type: Role, description: 'Role created' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get Specific Role', description: 'Get Role with specific ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of role',
    required: true,
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }


  @ApiOperation({ summary: 'Update Role', description: 'Update Role with specific ID' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of Role',
    required: true,
    example: 1,
  })
  @ApiBody({ type: UpdateRoleDto })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Delete Role', description: 'Delete Role with specific ID' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Id of Role',
    required: true,
    example: 1,
  })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
