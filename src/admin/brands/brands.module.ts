import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from 'src/schema/brands.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brands', schema: BrandSchema }]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
