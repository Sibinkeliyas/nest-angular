import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sizeSchema } from 'src/schema/size.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sizes', schema: sizeSchema }])],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
