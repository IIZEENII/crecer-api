import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationSender } from '../../invitedAccounts/application/InvitationSender';
import { InvitedAccount } from '../domain/InvitedAccount';
import { InvitationDeleter } from '../application/InvitationDeleter';
import { InvitationFinder } from '../application/InvitationFinder';
import { InvitedAccountsController } from './InvitedAccountsController';
import { InvitationCreator } from '../application/InvitationCreator';
import { EmployeesModule } from '@src/employees/infrastructure/EmployeesModule';
import { UnitOfWorkForInvitations } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForInvitations';

@Module({
  imports: [TypeOrmModule.forFeature([InvitedAccount]), EmployeesModule],
  controllers: [InvitedAccountsController],
  providers: [
    InvitationSender,
    InvitationDeleter,
    InvitationFinder,
    InvitationCreator,
    UnitOfWorkForInvitations,
  ],
  exports: [InvitationFinder],
})
export class InvitedAccountsModule {}
