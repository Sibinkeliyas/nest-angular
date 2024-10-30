import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICart } from 'src/interface/product.interface';

@Injectable()
export class CartService {
  constructor(@InjectModel('carts') private CartSchema: Model<ICart>) {}
  create(createCartDto: ICart): Promise<ICart> {
    return this.CartSchema.create(createCartDto);
  }

  findAll() {
    return this.CartSchema.find();
  }

  findOne(id: string): Promise<ICart> {
    return this.CartSchema.findOne({ userId: id });
  }

  update(id: string, updateCartDto: ICart) {
    return this.CartSchema.updateOne({ userId: id }, updateCartDto);
  }

  updateQuantity(userId: string, productId: string, quantity: number) {
    return this.CartSchema.updateOne(
      { userId, 'products.productId': productId },
      { $inc: { 'products.$.quantity': quantity } },
    );
  }

  updateCart(data: CreateCartDto) {
    return this.CartSchema.updateOne(
      { userId: data.userId },
      { $push: { products: { productId: data.productId, quantity: 1 } } },
    );
  }

  remove(id: string) {
    return this.CartSchema.deleteOne({ _id: id });
  }
}
