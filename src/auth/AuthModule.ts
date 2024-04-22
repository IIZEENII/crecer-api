import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateUsecase } from './usecases/Authenticator';
import { AuthController } from './controllers/AuthController';
import { EmployeesModule } from '@src/employees/EmployeesModule';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatorGuard } from '../shared/infrastructure/guards/AuthenticatorGuard';
import { EnvGetter } from '@src/shared/infrastructure/config/env/EnvGetter';
import { InvitedAccountsModule } from '@src/invitedAccounts/InvitedAccountsModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [EnvGetter],
      global: true,
      useFactory: (envGetter: EnvGetter) => ({
        secret: envGetter.get('SECRET_SIGNATURE'),
        signOptions: { expiresIn: '6h' },
      }),
    }),
    EmployeesModule,
    InvitedAccountsModule,
  ],
  providers: [
    AuthenticateUsecase,
    { provide: APP_GUARD, useClass: AuthenticatorGuard },
  ],
  controllers: [AuthController],
  exports: [AuthenticateUsecase],
})
export class AuthModule {}
