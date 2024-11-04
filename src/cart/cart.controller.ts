import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ICart } from 'src/interface/product.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<any> {
    const userCart = await this.cartService.findOne('1');
    if (userCart) {
      const isProductExist = userCart.products.find(
        (product) => product.productId === createCartDto.productId,
      );
      if (isProductExist)
        return this.cartService.updateQuantity(
          '1',
          createCartDto.productId,
          createCartDto.quantity,
        );
      else return this.cartService.updateCart(createCartDto);
    }
    const cartData: ICart = {
      userId: '1',
      products: [
        {
          productId: createCartDto.productId,
          quantity: createCartDto.quantity,
        },
      ],
    };
    return this.cartService.create(cartData);
  }

  @Get()
  findAll() {
    return this.cartService.findAll('1');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    // return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
