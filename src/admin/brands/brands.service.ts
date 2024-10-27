import { Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrands } from 'src/interface/brand.inteface';

@Injectable()
export class BrandsService {
  constructor(@InjectModel('Brands') private brandModel: Model<IBrands>) {}

  async create(createBrandDto: CreateBrandDto): Promise<IBrands> {
    return this.brandModel.create(createBrandDto)
  }

  async createMany(createBrandDto: CreateBrandDto[]): Promise<IBrands[]> {
    const newBrands = await this.brandModel.insertMany(createBrandDto);
    return newBrands;
  }

  async findAll(): Promise<IBrands[]> {
    return this.brandModel.find();
  }

  findOne(id: string): Promise<IBrands> {
    return this.brandModel.findById(id);
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Promise<IBrands> {
    return this.brandModel.findByIdAndUpdate(id, updateBrandDto);
  }

  remove(id: string) {
    return this.brandModel.deleteOne({ _id: id });
  }
}
