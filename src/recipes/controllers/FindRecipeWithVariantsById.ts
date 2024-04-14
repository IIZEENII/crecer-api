import { Controller, Get, Param } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Recipe } from '../entities/recipe';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindRecipeWithVariantByIdUsecase } from '../usecases/FindRecipeWithVariantsById.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class FindRecipeByIdController {
  constructor(private readonly usecase: FindRecipeWithVariantByIdUsecase) {}

  @Get(':id/variants')
  async findWithVariantsById(@Param() { id }: IdParam): Promise<Recipe> {
    return this.usecase.execute(id);
  }
}
