import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Product } from '../domain/Product';
import { ProductFinder } from '../application/ProductFinder';
import { ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { ProductUpdater } from '../application/ProductUpdater';
import { UpdateProductNameDto } from './dtos/UpdateProductName.dto';
import { UpdateProductStockDto } from './dtos/UpdateProductStock.dto';
import { UpdateProductPriceDto } from './dtos/UpdateProductPrice.dto';
import { UpdateProductDescriptionDto } from './dtos/UpdateProductDescription.dto';

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

  @Patch(':id/name')
  async udpateName(
    @Param() { id }: IdParam,
    @Body() updateProductNameDto: UpdateProductNameDto,
  ): Promise<void> {
    return this.productUpdater.updateName(id, updateProductNameDto);
  }

  @Patch(':id/stock')
  async udpateStock(
    @Param() { id }: IdParam,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ): Promise<void> {
    return this.productUpdater.updateStock(id, updateProductStockDto);
  }

  @Patch(':id/price')
  async udpatePrice(
    @Param() { id }: IdParam,
    @Body() updateProductPriceDto: UpdateProductPriceDto,
  ): Promise<void> {
    return this.productUpdater.updatePrice(id, updateProductPriceDto);
  }

  @Patch(':id/description')
  async udpateDescription(
    @Param() { id }: IdParam,
    @Body() updateProductDescriptionDto: UpdateProductDescriptionDto,
  ): Promise<void> {
    return this.productUpdater.updateDescription(
      id,
      updateProductDescriptionDto,
    );
  }
}
