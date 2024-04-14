import { IsUrl, Length, MinLength } from 'class-validator';

export class UpdateUserAccountDto {
  @Length(1, 32)
  firstname: string;

  @Length(1, 32)
  lastname: string;

  @MinLength(8)
  password: string;

  @IsUrl()
  avatar: string;
}
