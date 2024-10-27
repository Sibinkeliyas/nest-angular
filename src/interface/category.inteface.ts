import mongoose from 'mongoose';

export interface ICategory {
  id: mongoose.Types.ObjectId;
  categoryName: string;
}
