import { Controller, Get, Query } from '@nestjs/common';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { FindAllAccountsUseCase } from '../usecases/FindAllAccounts.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class GetAllAccountsController {
  constructor(
    private readonly findAllAccountsUseCase: FindAllAccountsUseCase,
  ) {}

  @Get()
  async update(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.findAllAccountsUseCase.execute(pageOptionsDto);
  }
}
