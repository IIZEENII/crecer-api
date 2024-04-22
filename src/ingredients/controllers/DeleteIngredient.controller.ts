import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindIngredientByIdUsecase } from '../usecases/FindIngredientById.usecase';
import { DeleteIngredientWithoutRecipeVariantsUsecase } from '../usecases/DeleteIngredientWithoutRecipeVariants.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class DeleteIngredientController {
  constructor(
    private readonly deleteIngredient: DeleteIngredientWithoutRecipeVariantsUsecase,
    private readonly findIngredientById: FindIngredientByIdUsecase,
  ) {}

  @Delete(':id')
  async run(@Param() { id }: IdParam): Promise<void> {
    const ingredient = await this.findIngredientById.execute(id);
    await this.deleteIngredient.execute(ingredient);
  }
}
