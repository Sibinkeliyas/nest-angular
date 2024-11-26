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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

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
    return {
      url: files,
      body: body,
    };
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  async findAll(@Query() query: any) {
    try {
      const products = await this.productsService.findAll();
      const totalProducts = await this.productsService.findCount();
      return { products, totalProducts };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/find-sale-products')
  findTopSellers() {
    return this.productsService.findTopSellers();
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(productId)
  }

  @Get('/find-filtered-products')
  @ApiQuery({ name: 'categories', required: false })
  @ApiQuery({ name: 'brands', required: false })
  @ApiQuery({ name: 'sizes', required: false })
  @ApiQuery({ name: 'priceRange', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  async findFilteredProducts(@Query() query: any) {
    const {
      categories,
      brands,
      sizes,
      priceRange,
      search,
      sort,
      limit,
      perPage,
    } = query;

    const filter: any = {};
    if (categories) {
      filter.categoryId = { $in: categories.split(',') };
    }
    if (brands) {
      filter.brandId = { $in: brands.split(',') };
    }
    if (sizes) {
      filter.availableSizes = { $in: sizes.split(',') };
    }
    if (search) {
      filter['$or'] = [{ name: { $regex: search, $options: 'i' } }];
    }
    // if (priceRange) {
    //   filter.price = {  }
    // }
    const [products, totalProducts] = await Promise.all([
      this.productsService.findFilteredProducts(
        filter,
        Number(sort),
        Number(limit) * Number(perPage),
        Number(perPage),
      ),
      this.productsService.findCount(filter),
    ]);
    return { products, totalProducts };
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
