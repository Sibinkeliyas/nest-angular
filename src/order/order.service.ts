import { CartSchema } from 'src/schema/cart.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICart, IOrder } from 'src/interface/product.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('orders') private orderSchema: Model<IOrder>,
    @InjectModel('carts') private cartSchema: Model<ICart>,
  ) {}

  findAllOrders(userId: string) {
    return this.orderSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
    ]);
  }

  createOrders(data: IOrder) {
    return this.orderSchema.create(data);
  }

  deleteCart(userId: string) {
    return this.cartSchema.deleteOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
  }
}
