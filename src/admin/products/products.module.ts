import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from 'src/schema/product.schema';
import { extname, join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const uploadDir = join(process.cwd(), 'uploads');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const fileName = `${Date.now()}-${file.originalname}-${ext}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif') {
          cb(null, true);
        } else {
          cb(new Error('Only images are allowed...'), false);
        }
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
