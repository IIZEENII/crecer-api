import { Controller, Get, Query } from '@nestjs/common';
import { Ingredient } from '../entities/ingredient';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { FindAllIngredientsUsecase } from '../usecases/FindAllIngredients.usecase';
import { PublicRoute } from '@src/shared/infrastructure/decorators/PublicRoute';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class FindAllIngredientsController {
  constructor(private readonly findAllIngredients: FindAllIngredientsUsecase) {}

  @Get()
  async run(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Ingredient>> {
    return this.findAllIngredients.execute(pageOptionsDto);
  }
}
