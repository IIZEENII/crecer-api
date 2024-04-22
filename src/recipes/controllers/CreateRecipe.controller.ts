import { Body, Controller, Post } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRecipeDto } from '../dtos/CreateRecipe.dto';
import { CreateRecipeUsecase } from '../usecases/CreateRecipe.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class CreateRecipeController {
  constructor(private readonly createRecipeUseCase: CreateRecipeUsecase) {}

  @Post()
  async run(@Body() createRecipeDto: CreateRecipeDto): Promise<void> {
    return this.createRecipeUseCase.execute(createRecipeDto);
  }
}
