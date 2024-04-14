import { Module } from '@nestjs/common';
import { GetAllAccountsController } from './controllers/GetAllAccounts.controller';
import { UpdateAccountController } from './controllers/UpdateAccount.controller';
import { FindAccountUseCase } from './usecases/FindAccountById.usecase';
import { UpdateAccountUseCase } from './usecases/UpdateAccount.usecase';
import { FindAllAccountsUseCase } from './usecases/FindAllAccounts.usecase';
import { Employee } from '@src/employees/domain/Employee';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [GetAllAccountsController, UpdateAccountController],
  providers: [FindAllAccountsUseCase, FindAccountUseCase, UpdateAccountUseCase],
})
export class UserAccountsModule {}
