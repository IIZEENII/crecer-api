import { Body, Controller, Patch, Request } from '@nestjs/common';
import { UpdateAccountUseCase } from '../usecases/UpdateAccount.usecase';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { UpdateUserAccountDto } from '../dtos/UpdateUserAccount.dto';
import { FindAccountByIdUsecase } from '../usecases/FindAccountById.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class UpdateAccountController {
  constructor(
    private readonly findAccountUseCase: FindAccountByIdUsecase,
    private readonly updateAccountUseCase: UpdateAccountUseCase,
  ) {}

  @Patch()
  async run(
    @Request() request: any,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    const account = await this.findAccountUseCase.execute(request.employee.id);
    this.updateAccountUseCase.execute(account.id, updateUserAccountDto);
  }
}
