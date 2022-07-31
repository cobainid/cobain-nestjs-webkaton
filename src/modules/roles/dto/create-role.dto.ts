import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Members', description: 'Name of role' })
  @IsNotEmpty()
  name: string;
}
