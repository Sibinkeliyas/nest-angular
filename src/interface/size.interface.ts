import mongoose from 'mongoose';

export interface ISize {
  id: mongoose.Types.ObjectId;
  sizeName: string;
}
