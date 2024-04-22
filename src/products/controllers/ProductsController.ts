import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductFinder } from '../usecases/ProductFinder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { ProductUpdater } from '../usecases/ProductUpdater';
import { UpdateProductDto } from '../dtos/UpdateProduct.dto';
import { ProductDisabler } from '../usecases/ProductDisabler';
import { ProductDto } from '../dtos/Product.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsFinder: ProductFinder,
    private readonly productUpdater: ProductUpdater,
    private readonly productDisabler: ProductDisabler,
  ) {}

  @Get()
  async findAll(
    @Query() filterOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductDto>> {
    return this.productsFinder.findAll(filterOptionsDto);
  }

  @Get(':id')
  async findById(@Param() { id }: IdParam): Promise<ProductDto> {
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
    return this.productDisabler.disable(product.id);
  }
}
