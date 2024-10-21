import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './brand.dto';
import { response } from 'express';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      const newBrand = await this.brandService.create(createBrandDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Brand has been created successfully',
        newBrand,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Brand not created!',
        error,
      });
    }
  }

  @Post('/create-many')
  createMany(@Body() createBrandDto: CreateBrandDto[]) {
    return this.brandService.createMany(createBrandDto);
  }
}
