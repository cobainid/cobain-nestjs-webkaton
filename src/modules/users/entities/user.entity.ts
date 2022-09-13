import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password_hash: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: 1 })
  role_id: number;
}
