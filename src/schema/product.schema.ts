import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { Categories } from './category.schema';
import { Sizes } from './size.schema';
import { Brands } from './brands.schema';

// export type ProductDocument = HydratedDocument<Cat>
@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  productImage: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
  categoryId: Categories;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brands ' })
  brandId: Brands;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Sizes' })
  availableSizes: Sizes[];

  @Prop()
  rating: number;

  @Prop({ default: false })
  sale: boolean;

  @Prop()
  images: string[]

  @Prop({ default: now() })
  addedDate: Date;

  @Prop({ default: now() })
  updatedDate: Date;
}

export const productSchema = SchemaFactory.createForClass(Products);
