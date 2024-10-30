import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/schema/cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'carts', schema: CartSchema }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
