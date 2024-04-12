import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Authenticator } from '../application/Authenticator';
import { AuthController } from './AuthController';
import { EmployeesModule } from '@src/employees/infrastructure/EmployeesModule';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatorGuard } from '../../shared/infrastructure/guards/AuthenticatorGuard';
import { EnvGetter } from '@src/shared/infrastructure/config/env/EnvGetter';
import { InvitedAccountsModule } from '@src/invitedAccounts/infrastructure/InvitedAccountsModule';

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
    Authenticator,
    { provide: APP_GUARD, useClass: AuthenticatorGuard },
  ],
  controllers: [AuthController],
  exports: [Authenticator],
})
export class AuthModule {}
