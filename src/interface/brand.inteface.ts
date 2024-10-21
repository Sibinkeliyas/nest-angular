import mongoose, { Document } from 'mongoose';

export interface IBrands extends Document {
  readonly id: mongoose.Schema.Types.ObjectId;
  readonly brandName: string;
}
