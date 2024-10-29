export class CreateProductDto {
  name: string;
  price: number;
  categoryId: string;
  brandId: string;
  availableSizes: string;
  rating: number;
  sale: boolean;
  images: string[];
}

export class UpdateProductDto {}
