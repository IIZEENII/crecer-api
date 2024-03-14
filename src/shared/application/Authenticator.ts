import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '@src/employees/domain/Employee';

// TODO: rename class,is not a authenticator, is a token generator
@Injectable()
export class Authenticator {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(
    employee: Employee,
    password: string,
  ): Promise<{ accessToken: string }> {
    if (employee.password != password) {
      throw new UnauthorizedException('invalid credentials');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: employee.id,
        roles: employee.roles,
      }),
    };
  }
}
