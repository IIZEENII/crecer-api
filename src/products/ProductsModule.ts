import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/ProductsController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { ProductFinder } from './usecases/ProductFinder';
import { ProductUpdater } from './usecases/ProductUpdater';
import { ProductDisabler } from './usecases/ProductDisabler';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductFinder, ProductUpdater, ProductDisabler],
})
export class ProductsModule {}
