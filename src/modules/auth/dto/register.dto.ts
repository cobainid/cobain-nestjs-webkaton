import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'defrindr@gmail.com', description: 'Valid Email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Defri Indra Mahardika', description: 'Name of user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123456', description: 'Password with minimum 6 character' })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
