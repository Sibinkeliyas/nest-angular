import { IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  readonly productId: string;
  @IsNumber()
  readonly quantity: number;
  readonly userId: string;
}
