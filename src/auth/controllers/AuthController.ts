import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeFinder } from '@src/employees/usecases/EmployeeFinder';
import { AuthenticateUsecase } from '../usecases/Authenticator';
import { SignInEmployeeDto } from '@src/employees/dtos/SignInEmployee.dto';
import { PublicRoute } from '../../shared/infrastructure/decorators/PublicRoute';
import { InvitationFinder } from '@src/invitedAccounts/usecases/InvitationFinder';
import { EmployeeCreator } from '@src/employees/usecases/EmployeeCreator';
import { SignUpDto } from '../dtos/SignUp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly employeeFinder: EmployeeFinder,
    private readonly employeeCreator: EmployeeCreator,
    private readonly authenticator: AuthenticateUsecase,
    private readonly invitationFinder: InvitationFinder,
  ) {}

  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() { email, password }: SignInEmployeeDto,
  ): Promise<{ accessToken: string }> {
    const employee = await this.employeeFinder.findByEmail(email);
    return this.authenticator.execute(employee, password);
  }

  @PublicRoute()
  @Post('sign-up')
  async signUp(
    @Query('invitationToken') invitationToken: string,
    @Body() signUpDto: SignUpDto,
  ): Promise<void> {
    const { email } =
      await this.invitationFinder.findByInvitationToken(invitationToken);
    await this.employeeCreator.create({ email, ...signUpDto });
  }
}
