import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICart } from 'src/interface/product.interface';

@Injectable()
export class CartService {
  constructor(@InjectModel('carts') private CartSchema: Model<ICart>) {}
  create(createCartDto: ICart): Promise<ICart> {
    return this.CartSchema.create(createCartDto);
  }

  findAll(userId: string) {
    return this.CartSchema.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productsDetails',
        },
      },
      {
        $unwind: '$productsDetails',
      },
      {
        $addFields: {
          quantity: '$products.quantity',
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          quantity: 1,
          productsDetails: 1,
        },
      },
    ]);
  }

  findOne(id: string): Promise<ICart> {
    return this.CartSchema.findOne({ userId: new mongoose.Types.ObjectId(id) });
  }

  update(id: string, updateCartDto: ICart) {
    return this.CartSchema.updateOne({ userId: id }, updateCartDto);
  }

  updateQuantity(userId: string, productId: string, quantity: number) {
    return this.CartSchema.updateOne(
      {
        userId: new mongoose.Types.ObjectId(userId),
        'products.productId': new mongoose.Types.ObjectId(productId),
      },
      { $inc: { 'products.$.quantity': quantity } },
    );
  }

  updateCart(userId: string, data: CreateCartDto) {
    return this.CartSchema.updateOne(
      { userId: new mongoose.Types.ObjectId(userId) },
      {
        $push: {
          products: {
            productId: new mongoose.Types.ObjectId(data.productId),
            quantity: data.quantity,
          },
        },
      },
    );
  }

  updateCartQuantity(userId: string, data: any) {
    return this.CartSchema.updateOne(
      {
        userId: new mongoose.Types.ObjectId(userId),
        'products.productId': new mongoose.Types.ObjectId(data.productId),
      },
      {
        $set: {
          'products.$.quantity': data.quantity,
        },
      },
    );
  }

  remove(id: string) {
    return this.CartSchema.deleteOne({ _id: id });
  }
}
