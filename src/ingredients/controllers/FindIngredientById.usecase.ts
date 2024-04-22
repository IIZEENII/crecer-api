import { Controller, Get, Param } from '@nestjs/common';
import { Ingredient } from '../entities/ingredient';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindIngredientByIdUsecase } from '../usecases/FindIngredientById.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class FindIngredientByIdController {
  constructor(private readonly findIngredientById: FindIngredientByIdUsecase) {}

  @Get(':id')
  async run(@Param() { id }: IdParam): Promise<Ingredient> {
    return this.findIngredientById.execute(id);
  }
}
