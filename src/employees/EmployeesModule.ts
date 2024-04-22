import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/Employee';
import { EmployeeCreator } from './usecases/EmployeeCreator';
import { EmployeeFinder } from './usecases/EmployeeFinder';
import { InvitationSender } from '../invitedAccounts/usecases/InvitationSender';
import { UploadAvatarUsecase } from '../userAccounts/usecases/UploadAvatar.usecase';
import { EmployeeUpdater } from './usecases/EmployeeUpdater';
import { UnitOfWorkForInvitations } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForInvitations';
import { FindAllEmployeesController } from './controllers/FindAllEmployees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [FindAllEmployeesController],
  providers: [
    EmployeeCreator,
    EmployeeFinder,
    InvitationSender,
    UploadAvatarUsecase,
    EmployeeUpdater,
    UnitOfWorkForInvitations,
  ],
  exports: [EmployeeFinder, EmployeeCreator],
})
export class EmployeesModule {}
