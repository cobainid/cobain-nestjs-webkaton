import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password_hash: string;
}
