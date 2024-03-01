import { Module } from '@nestjs/common';
import { ProductsController } from './ProductsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductFinder],
})
export class ProductsModule {}
