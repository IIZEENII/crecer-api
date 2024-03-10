import { Module } from '@nestjs/common';
import { ProductsController } from './ProductsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';
import { ProductUpdater } from '../application/ProductUpdater';
import { ProductDisabler } from '../application/ProductDisabler';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductFinder, ProductUpdater, ProductDisabler],
})
export class ProductsModule {}
