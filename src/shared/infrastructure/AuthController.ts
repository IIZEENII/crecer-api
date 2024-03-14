import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeFinder } from '@src/employees/application/EmployeeFinder';
import { Authenticator } from '../application/Authenticator';
import { SignInEmployeeDto } from '@src/employees/infrastructure/dtos/SignInEmployee.dto';
import { PublicRoute } from './decorators/PublicRoute';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly employeeFinder: EmployeeFinder,
    private readonly authenticator: Authenticator,
  ) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() { email, password }: SignInEmployeeDto,
  ): Promise<{ accessToken: string }> {
    const employee = await this.employeeFinder.findByEmail(email);
    return this.authenticator.signIn(employee, password);
  }
}
