import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export class Sizes {
  @Prop({ required: true })
  size: string;
}

export const sizeSchema = SchemaFactory.createForClass(Sizes);
