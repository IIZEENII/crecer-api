import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './EmployeesController';
import { Employee } from '../domain/Employee';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { EmployeeFinder } from '../application/EmployeeFinder';
import { InvitationSender } from '../../invitedAccounts/application/InvitationSender';
import { AvatarUploader } from '../application/AvatarUploader';
import { AvatarDeleter } from '../application/AvatarDeleter';
import { EmployeeUpdater } from '../application/EmployeeUpdater';
import { UnitOfWorkForInvitations } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForInvitations';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [
    EmployeeCreator,
    EmployeeFinder,
    InvitationSender,
    AvatarUploader,
    AvatarDeleter,
    EmployeeUpdater,
    UnitOfWorkForInvitations,
  ],
  exports: [EmployeeFinder, EmployeeCreator],
})
export class EmployeesModule {}
