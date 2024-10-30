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
  productId: string;
  quantity: number;
}
export interface ICart {
  userId: string;
  products: ICartItem[];
}
