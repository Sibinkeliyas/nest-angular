import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { Categories } from './category.schema';
import { Sizes } from './size.schema';
import { Brands } from './brands.schema';

// export type ProductDocument = HydratedDocument<Cat>
@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  productName: string;

  @Prop()
  price: number;

  @Prop()
  productImage: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
  category: Categories;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brands ' })
  brand: Brands;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Sizes' })
  sizes: Sizes[];

  @Prop()
  rating: number;

  @Prop({ default: false })
  sale: boolean;

  @Prop({ default: now() })
  addedDate: Date;

  @Prop({ default: now() })
  updatedDate: Date;
}
