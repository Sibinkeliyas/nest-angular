import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICategory } from 'src/interface/category.inteface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories') private CategoriesModel: Model<ICategory>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    return this.CategoriesModel.create(createCategoryDto);
  }

  createMany(createCategoryDto: CreateCategoryDto[]): Promise<ICategory[]> {
    return this.CategoriesModel.insertMany(createCategoryDto);
  }

  findAll(): Promise<ICategory[]> {
    return this.CategoriesModel.find();
  }

  findOne(id: string) {
    return this.CategoriesModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.CategoriesModel.findOneAndUpdate(
      { _id: id },
      updateCategoryDto,
    );
  }

  remove(id: string) {
    return this.CategoriesModel.deleteOne({ _id: id });
  }
}
