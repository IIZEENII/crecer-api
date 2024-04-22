import {
  Controller,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateAccountUseCase } from '../usecases/UpdateAccount.usecase';
import { CONTROLLER_NAME, CONTROLLER_TAG } from '../constants';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from '@src/shared/infrastructure/dtos/FileUpload.dto';
import { FindAccountByIdUsecase } from '../usecases/FindAccountById.usecase';
import { UploadAvatarUsecase } from '../usecases/UploadAvatar.usecase';
import { Role } from '@src/employees/enums/Role';

@ApiBearerAuth()
@ApiTags(CONTROLLER_TAG)
@Controller(CONTROLLER_NAME)
export class UploadAvatarController {
  constructor(
    private readonly findAccountById: FindAccountByIdUsecase,
    private readonly uploadAvatar: UploadAvatarUsecase,
    private readonly updateAccount: UpdateAccountUseCase,
  ) {}

  @Roles(Role.BASIC_EMPLOYEE, Role.MOTHER_ADMIN)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async run(
    @Request() request: any,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<void> {
    const account = await this.findAccountById.execute(request.employee.id);
    const uploadResult = await this.uploadAvatar.execute(file, account.id);
    account.avatar = uploadResult.url;
    this.updateAccount.execute(account.id, { ...account });
  }
}
