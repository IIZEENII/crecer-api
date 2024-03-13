import { IsEmail, Length, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @Length(1, 32)
  firstname: string;

  @Length(1, 32)
  lastname: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
