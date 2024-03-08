import { Min } from 'class-validator';

export class UpdateProcedureDescription {
  @Min(1)
  description: string;
}
