import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create.dto';
import { IOrder } from 'src/interface/product.interface';

@ApiTags('orders')
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(@Request() req) {
    return this.orderService.findAllOrders(req.user.id);
  }

  @Post()
  async createOrders(@Request() req, @Body() createDto: CreateOrderDto) {
    await this.orderService.createOrders({
      ...createDto,
      userId: req.user.id,
    });
    return this.orderService.deleteCart(req.user.id);
  }
}
