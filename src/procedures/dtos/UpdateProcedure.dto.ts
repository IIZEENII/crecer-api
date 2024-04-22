import { MinLength } from 'class-validator';

export class UpdateProcedureDto {
  @MinLength(1)
  description: string;
}
