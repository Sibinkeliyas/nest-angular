import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly userName: string;

  @MaxLength(50)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}
