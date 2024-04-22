import { Controller, Get, Query } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { Recipe } from '../entities/recipe';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { FindAllRecipesUsecase } from '../usecases/FindAllRecipes.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class FindAllRecipesController {
  constructor(private readonly findAllRecipesUsecase: FindAllRecipesUsecase) {}

  @Get()
  async run(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Recipe>> {
    return this.findAllRecipesUsecase.execute(pageOptionsDto);
  }
}
