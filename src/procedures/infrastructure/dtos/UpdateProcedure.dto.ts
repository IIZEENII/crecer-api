import { MinLength } from 'class-validator';

export class UpdateProcedure {
  @MinLength(1)
  description: string;
}
