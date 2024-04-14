import { Controller, Delete, Param } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindRecipeByIdUsecase } from '../usecases/FindRecipeById.usecase';
import { DeleteRecipeUsecase } from '../usecases/DeleteRecipe.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class DeleteRecipeController {
  constructor(
    private readonly findRecipeByIdUsecase: FindRecipeByIdUsecase,
    private readonly deleteRecipeUsecase: DeleteRecipeUsecase,
  ) {}

  @Delete(':id')
  async delete(@Param() { id }: IdParam): Promise<void> {
    const recipe = await this.findRecipeByIdUsecase.execute(id);
    return this.deleteRecipeUsecase.execute(recipe);
  }
}
