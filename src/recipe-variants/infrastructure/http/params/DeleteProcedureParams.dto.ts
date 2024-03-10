import { IsUUID } from 'class-validator';

export class DeleteProcedureParams {
  @IsUUID('4')
  id: string;
  @IsUUID('4')
  procedureId: string;
}
