import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { ProductUpdater } from '../application/ProductUpdater';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductDisabler } from '../application/ProductDisabler';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsFinder: ProductFinder,
    private readonly productUpdater: ProductUpdater,
    private readonly productDisabler: ProductDisabler,
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsFinder.findAll();
  }

  @Get(':id')
  async findById(@Param() { id }: IdParam): Promise<Product> {
    return this.productsFinder.findById(id);
  }

  @Patch(':id')
  async udpate(
    @Param() { id }: IdParam,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const product = await this.productsFinder.findById(id);
    return this.productUpdater.update(product.id, updateProductDto);
  }

  @Delete(':id')
  async disable(@Param() { id }: IdParam): Promise<void> {
    const product = await this.productsFinder.findById(id);
    return this.productDisabler.disable(product);
  }
}
