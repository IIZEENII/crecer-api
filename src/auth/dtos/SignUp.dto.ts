import { Length, MinLength } from 'class-validator';

export class SignUpDto {
  @Length(1, 32)
  firstname: string;

  @Length(1, 32)
  lastname: string;

  @MinLength(8)
  password: string;
}
