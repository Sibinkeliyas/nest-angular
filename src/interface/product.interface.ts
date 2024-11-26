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

export interface IOrderProducts {
  productId: string;
  quantity: string;
  price: string;
}

export interface IOrder {
  userId: string;
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
  email: string;
  couponId: string;
  paymentMethod: string;
  total: string;
  products: IOrderProducts[];
}
