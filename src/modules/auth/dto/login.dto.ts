import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class LoginDto {
  @ApiProperty({example: 'defrindr@gmail.com'})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({example: '123456'})
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
