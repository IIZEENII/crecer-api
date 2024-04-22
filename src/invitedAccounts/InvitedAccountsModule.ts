import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationSender } from './usecases/InvitationSender';
import { InvitedAccount } from './entities/InvitedAccount';
import { InvitationDeleter } from './usecases/InvitationDeleter';
import { InvitationFinder } from './usecases/InvitationFinder';
import { InvitedAccountsController } from './controllers/InvitedAccountsController';
import { InvitationCreator } from './usecases/InvitationCreator';
import { EmployeesModule } from '@src/employees/EmployeesModule';
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
