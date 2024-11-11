import mongoose from 'mongoose';

export interface IProducts {
  name: string;
  rating: number;
  sale: boolean;
  price: number;
  categoryId: string;
  brandId: string;
  availableSizes: string;
  image: string[];
}

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}
export interface ICart {
  userId: mongoose.Types.ObjectId;
  products: ICartItem[];
}
