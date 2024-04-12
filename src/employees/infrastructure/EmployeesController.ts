import {
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Employee } from '../domain/Employee';
import { EmployeeFinder } from '../application/EmployeeFinder';
import { Role } from '../domain/Role';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { RolesGuard } from '@src/shared/infrastructure/guards/RolesGuard';
import { AvatarUploader } from '../application/AvatarUploader';
import { AvatarDeleter } from '../application/AvatarDeleter';
import { Express } from 'express';
import { FileUploadDto } from '@src/shared/infrastructure/dtos/FileUpload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeeUpdater } from '../application/EmployeeUpdater';
@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
@UseGuards(RolesGuard)
@Roles(Role.MOTHER_ADMIN)
export class EmployeesController {
  constructor(
    private readonly employeFinder: EmployeeFinder,
    private readonly employeUpdater: EmployeeUpdater,
    private readonly avatarUploader: AvatarUploader,
    private readonly avatarDeleter: AvatarDeleter,
  ) {}

  // TODO: should split in account endpoints and employees
  @Roles(Role.BASIC_EMPLOYEE, Role.MOTHER_ADMIN)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async uploadAvatar(
    @Request() request: any,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<void> {
    const employee = await this.employeFinder.findById(request.employee.id);
    const uploadResult = await this.avatarUploader.uploadAvatar(
      file,
      employee.id,
    );
    employee.avatar = uploadResult.url;
    this.employeUpdater.update(employee.id, { ...employee });
  }

  @Roles(Role.BASIC_EMPLOYEE, Role.MOTHER_ADMIN)
  @Delete('avatar')
  async removeAvatar(@Request() request: any): Promise<void> {
    const employee = await this.employeFinder.findById(request.employee.id);
    await this.avatarDeleter.delete(employee.id);
    employee.avatar = null;
    this.employeUpdater.update(employee.id, { ...employee });
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return await this.employeFinder.findAll();
  }
}
