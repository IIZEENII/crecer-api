import { Controller, Delete, Request } from '@nestjs/common';
import { UpdateAccountUseCase } from '../usecases/UpdateAccount.usecase';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { FindAccountByIdUsecase } from '../usecases/FindAccountById.usecase';
import { RemoveAvatarByIdUsecase } from '../usecases/DeleteAvatar.usecase';
import { Role } from '@src/employees/enums/Role';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class RemoveAvatarController {
  constructor(
    private readonly findAccountById: FindAccountByIdUsecase,
    private readonly removeAvatar: RemoveAvatarByIdUsecase,
    private readonly updateAccount: UpdateAccountUseCase,
  ) {}

  @Roles(Role.BASIC_EMPLOYEE, Role.MOTHER_ADMIN)
  @Delete('avatar')
  async run(@Request() request: any): Promise<void> {
    const account = await this.findAccountById.execute(request.employee.id);
    await this.removeAvatar.execute(account.id);
    account.avatar = null;
    await this.updateAccount.execute(account.id, { ...account });
  }
}
