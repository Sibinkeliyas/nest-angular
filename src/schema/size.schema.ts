import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Sizes {
  @Prop({ required: true })
  sizeName: string;
}

export const sizeSchema = SchemaFactory.createForClass(Sizes);
