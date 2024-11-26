import { IsNotEmpty, IsNumber, isNumber, IsString } from 'class-validator';
import { IOrder, IOrderProducts } from 'src/interface/product.interface';

export class CreateOrderDto {
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly postCode: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  readonly couponId: string;

  @IsString()
  @IsNotEmpty()
  readonly paymentMethod: string;

  @IsNumber()
  @IsNotEmpty()
  readonly total: string;

  @IsNotEmpty()
  readonly products: IOrderProducts[];
}
