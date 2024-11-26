import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
class Product {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'products' })
  productId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);

@Schema()
export class Orders {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'users' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  postCode: string;

  @Prop({ required: true, type: String })
  phone: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'coupons' })
  couponId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [ProductSchema], required: true })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
