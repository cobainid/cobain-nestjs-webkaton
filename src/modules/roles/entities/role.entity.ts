import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @ApiProperty({ example: '1', description: 'Id of role' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Members', description: 'Name of role' })
  @Column({ unique: true })
  name: string;
}
