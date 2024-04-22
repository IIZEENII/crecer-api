import { Body, Controller, Post } from '@nestjs/common';
import { CreateIngredientDto } from '../dtos/CreateIngredient.dto';
import { CreateIngredientUsecase } from '../usecases/CreateIngredient.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class CreateIngredientController {
  constructor(private readonly createIngredient: CreateIngredientUsecase) {}

  @Post()
  async run(@Body() createIngredientDto: CreateIngredientDto): Promise<void> {
    return this.createIngredient.execute(createIngredientDto);
  }
}
