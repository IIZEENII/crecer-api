import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { ProductUpdater } from '../application/ProductUpdater';
import { UpdateProductNameDto } from './dtos/UpdateProductName.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsFinder: ProductFinder,
    private readonly productUpdater: ProductUpdater,
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
    @Body() updateProductNameDto: UpdateProductNameDto,
  ): Promise<void> {
    return this.productUpdater.updateName(id, updateProductNameDto);
  }

  @Delete(':id')
  async delete(@Param() { id }: IdParam): Promise<void> {
    console.log(id);
  }
}
