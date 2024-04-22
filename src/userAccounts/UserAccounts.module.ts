import { Module } from '@nestjs/common';
import { GetAccountByIdController } from './controllers/GetAccountById.controller';
import { UpdateAccountController } from './controllers/UpdateAccount.controller';
import { FindAccountByIdUsecase } from './usecases/FindAccountById.usecase';
import { UpdateAccountUseCase } from './usecases/UpdateAccount.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadAvatarUsecase } from './usecases/UploadAvatar.usecase';
import { UploadAvatarController } from './controllers/UploadAvatar.controller';
import { Employee } from '@src/employees/entities/Employee';
import { RemoveAvatarController } from './controllers/RemoveAvatar.controller';
import { RemoveAvatarByIdUsecase } from './usecases/DeleteAvatar.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [
    GetAccountByIdController,
    UpdateAccountController,
    UploadAvatarController,
    RemoveAvatarController,
  ],
  providers: [
    FindAccountByIdUsecase,
    UpdateAccountUseCase,
    UploadAvatarUsecase,
    RemoveAvatarByIdUsecase,
  ],
})
export class UserAccountsModule {}
