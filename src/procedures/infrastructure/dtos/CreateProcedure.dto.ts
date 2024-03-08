import { Min } from 'class-validator';

export class CreateProcedureDto {
  @Min(1)
  description: string;
}
