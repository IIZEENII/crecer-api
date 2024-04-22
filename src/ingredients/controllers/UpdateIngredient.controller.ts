import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindIngredientByIdUsecase } from '../usecases/FindIngredientById.usecase';
import { UpdateIngredientUsecase } from '../usecases/UpdateIngredient.usecase';
import { UpdateIngredientDto } from '../dtos/UpdateIngredient.dto';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class UpdateIngredientController {
  constructor(
    private readonly updateIngredient: UpdateIngredientUsecase,
    private readonly findIngredientById: FindIngredientByIdUsecase,
  ) {}

  @Patch(':id')
  async run(
    @Param() { id }: IdParam,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<void> {
    const ingredient = await this.findIngredientById.execute(id);
    await this.updateIngredient.execute(ingredient, updateIngredientDto);
  }
}
