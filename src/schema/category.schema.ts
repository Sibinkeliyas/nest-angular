import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Categories {
  @Prop({ required: true })
  categoryName: string;
}

export const CategorySchema = SchemaFactory.createForClass(Categories);
