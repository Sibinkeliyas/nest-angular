import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Products } from './product.schema';

@Schema()
export class ProductItem {
  @Prop({ type: mongoose.Types.ObjectId, schema: 'products' })
  productId: Products;

  @Prop({ required: true })
  quantity: number;
}

const ProductItemSchema = SchemaFactory.createForClass(ProductItem);

@Schema()
export class Carts {
  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: [ProductItemSchema], ref: 'products' })
  products: ProductItem[];
}

export const CartSchema = SchemaFactory.createForClass(Carts)