import { IsEmail, Length, MinLength } from 'class-validator';

// TODO: remove dto
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
