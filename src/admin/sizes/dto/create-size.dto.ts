import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  sizeName: string;
}
