import { Controller, Get, Param } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { FindAccountByIdUsecase } from '../usecases/FindAccountById.usecase';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class GetAccountByIdController {
  constructor(private readonly findById: FindAccountByIdUsecase) {}

  @Get()
  async run(@Param() { id }: IdParam) {
    return await this.findById.execute(id);
  }
}
