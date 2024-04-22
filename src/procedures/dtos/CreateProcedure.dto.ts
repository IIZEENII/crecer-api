import { MinLength } from 'class-validator';

export class CreateProcedureDto {
  @MinLength(1)
  description: string;
}
