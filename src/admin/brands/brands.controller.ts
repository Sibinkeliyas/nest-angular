import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';
import { response } from 'express';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Post('/create-many')
  async createMany(@Body() createBrandDto: CreateBrandDto[]) {
    return this.brandService.createMany(createBrandDto);
  }

  @Get()
  async findMany() {
    console.log('getgig');
    return this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Body() updateBrandDto: UpdateBrandDto,
    @Param('id') id: string,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
