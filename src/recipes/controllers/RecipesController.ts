import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';

@ApiBearerAuth()
@ApiTags('Recipes')
@Controller('recipes')
export class GenerateRecipePDFController {
  constructor() {}

  //TODO: implement
  @Get(':id/to-pdf')
  async run(@Param() { id }: IdParam): Promise<void> {
    console.log(id);
  }
}
