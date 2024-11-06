import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 3))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const images = files.map((file) => file.filename);
    return this.productsService.create({
      ...createProductDto,
      images,
    });
  }

  @Post('create-many')
  createMany(@Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createMany(createProductDto);
  }

  @Post('/upload-image')
  @UseInterceptors(FilesInterceptor('file', 3))
  uploadFile(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const fileUrl = `http://localhost:3000/uploads`;
    return {
      url: files,
      body: body,
    };
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/find-sale-products')
  findTopSellers() {
    return this.productsService.findTopSellers();
  }

  @Get('/find-filtered-products')
  findFilteredProducts() {
    return this.productsService.findTopSellers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
