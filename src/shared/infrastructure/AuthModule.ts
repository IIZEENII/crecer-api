import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Authenticator } from '../application/Authenticator';
import { AuthController } from './AuthController';
import { EmployeesModule } from '@src/employees/infrastructure/EmployeesModule';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatorGuard } from './guards/AuthGuard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      // TODO: change secret by env
      secret: 'secret',
      signOptions: { expiresIn: '6h' },
    }),
    EmployeesModule,
  ],
  providers: [
    Authenticator,
    { provide: APP_GUARD, useClass: AuthenticatorGuard },
  ],
  controllers: [AuthController],
  exports: [Authenticator],
})
export class AuthModule {}
