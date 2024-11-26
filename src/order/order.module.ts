import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/schema/orders.schema';
import { CartSchema } from 'src/schema/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'orders', schema: OrderSchema },
      { name: 'carts', schema: CartSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
