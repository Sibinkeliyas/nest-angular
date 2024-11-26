import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ICart } from 'src/interface/product.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import mongoose from 'mongoose';

@ApiTags('Cart')
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(
    @Request() req,
    @Body() createCartDto: CreateCartDto,
  ): Promise<any> {
    console.log(createCartDto);
    
    const userCart = await this.cartService.findOne(req.user.id);
    if (userCart) {
      const isProductExist = userCart.products.find((product) =>
        new mongoose.Types.ObjectId(product.productId).equals(
          new mongoose.Types.ObjectId(createCartDto.productId),
        ),
      );
      if (isProductExist)
        return this.cartService.updateQuantity(
          req.user.id,
          createCartDto.productId,
          createCartDto.quantity,
        );
      else return this.cartService.updateCart(req.user.id, createCartDto);
    }
    const cartData: ICart = {
      userId: new mongoose.Types.ObjectId(req.user.id),
      products: [
        {
          productId: new mongoose.Types.ObjectId(createCartDto.productId),
          quantity: createCartDto.quantity,
        },
      ],
    };
    return this.cartService.create(cartData);
  }

  @Get()
  findAll(@Request() req) {
    return this.cartService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch()
  async update(@Request() req, @Body() updateCartDto: UpdateCartDto[]) {
    await Promise.all(
      updateCartDto.map((item) => {
        return this.cartService.updateCartQuantity(req.user.id, item);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
