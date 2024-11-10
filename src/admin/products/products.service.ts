import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProducts } from 'src/interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private ProductSchema: Model<IProducts>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<IProducts> {
    const availableSizes = createProductDto.availableSizes.split(',');
    return this.ProductSchema.create({ ...createProductDto, availableSizes });
  }

  createMany(createProductDto: CreateProductDto[]): Promise<IProducts[]> {
    return this.ProductSchema.insertMany(createProductDto);
  }

  findAll(limit = 0, perPage = 10): Promise<IProducts[]> {
    return this.ProductSchema.find()
      .skip(Number(limit) * Number(perPage))
      .limit(Number(perPage));
  }

  findCount(filter = {}) {
    return this.ProductSchema.find(filter).countDocuments();
  }

  findTopSellers(): Promise<IProducts[]> {
    return this.ProductSchema.find({ sale: true });
  }

  findFilteredProducts(
    filter: any,
    sort: any = 1,
    limit = 0,
    perPage = 10,
  ): Promise<IProducts[]> {
    return this.ProductSchema.find(filter)
      .skip(limit)
      .limit(perPage)
      .sort({ price: sort });
  }

  findOne(id: string): Promise<IProducts> {
    return this.ProductSchema.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<IProducts> {
    return this.ProductSchema.findByIdAndUpdate(id, updateProductDto);
  }

  remove(id: string) {
    return this.ProductSchema.deleteOne({ _id: id });
  }
}
