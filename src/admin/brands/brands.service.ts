import { Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrands } from 'src/interface/brand.inteface';

@Injectable()
export class BrandsService {
  constructor(@InjectModel('Brands') private brandModel: Model<IBrands>) {}
  async create(createBrandDto: CreateBrandDto): Promise<IBrands> {
    const newBrand = await new this.brandModel(createBrandDto);
    return newBrand.save();
  }

  async createMany(createBrandDto: CreateBrandDto[]): Promise<IBrands[]> {
    const newBrands = await this.brandModel.insertMany(createBrandDto);
    return newBrands;
  }

  findAll(): Promise<IBrands[]> {
    return this.brandModel.find();
  }

  findOne(id: number): Promise<IBrands> {
    return this.brandModel.findById(id);
  }

  update(id: number, updateBrandDto: UpdateBrandDto): Promise<IBrands> {
    return this.brandModel.findByIdAndUpdate(id, updateBrandDto);
  }

  remove(id: number) {
    return this.brandModel.deleteOne({ _id: id });
  }
}
