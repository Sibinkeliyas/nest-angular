import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './admin/products/products.module';
import { BrandsModule } from './admin/brands/brands.module';
import { BrandSchema } from './schema/brands.schema';
import { CategoryModule } from './admin/category/category.module';
import { SizesModule } from './admin/sizes/sizes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: 'Brands', schema: BrandSchema }]),
    ProductsModule,
    BrandsModule,
    CategoryModule,
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
