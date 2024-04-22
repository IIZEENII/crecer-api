import { IsEmail, IsUrl, Length, MinLength } from 'class-validator';

export class UpdateEmployeeDto {
  @Length(1, 32)
  firstname: string;

  @Length(1, 32)
  lastname: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsUrl()
  avatar: string;
}
