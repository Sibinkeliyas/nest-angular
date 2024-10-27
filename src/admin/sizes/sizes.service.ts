import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISize } from 'src/interface/size.interface';

@Injectable()
export class SizesService {
  constructor(@InjectModel('Sizes') private SizeModel: Model<ISize>) {}

  create(createSizeDto: CreateSizeDto): Promise<ISize> {
    return this.SizeModel.create(createSizeDto);
  }

  createMany(createSizeDto: CreateSizeDto[]): Promise<ISize[]> {
    console.log(createSizeDto);

    return this.SizeModel.insertMany(createSizeDto);
  }

  findAll(): Promise<ISize[]> {
    return this.SizeModel.find();
  }

  findOne(id: string): Promise<ISize> {
    return this.SizeModel.findById(id);
  }

  update(id: string, updateSizeDto: UpdateSizeDto): Promise<ISize> {
    return this.SizeModel.findOneAndUpdate({ _id: id }, updateSizeDto);
  }

  remove(id: string) {
    return this.SizeModel.deleteOne({ _id: id });
  }
}
