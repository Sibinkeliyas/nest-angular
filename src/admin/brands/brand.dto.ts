import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  readonly brandName: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
