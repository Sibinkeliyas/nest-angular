import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders } from 'src/schema/orders.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'orders', schema: Orders }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
