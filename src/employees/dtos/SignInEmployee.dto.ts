import { IsEmail, MinLength } from 'class-validator';

export class SignInEmployeeDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
