import { Body, Controller, Param, Patch } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRecipeUsecase } from '../usecases/UpdateRecipe';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { UpdateRecipeDto } from '../dtos/UpdateRecipe.dto';
import { FindRecipeByIdUsecase } from '../usecases/FindRecipeById.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class UpdateRecipeController {
  constructor(
    private readonly findRecipeByIdUsecase: FindRecipeByIdUsecase,
    private readonly updateRecipeUseCase: UpdateRecipeUsecase,
  ) {}

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<void> {
    const recipe = await this.findRecipeByIdUsecase.execute(id);
    await this.updateRecipeUseCase.execute(recipe, updateRecipeDto);
  }
}
