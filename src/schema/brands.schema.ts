import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Brands {
  @Prop({ required: true, unique: true })
  brandName: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brands);
