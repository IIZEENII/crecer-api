import { IsUUID } from 'class-validator';

export class IdParam {
  @IsUUID('4', { message: 'id param must be a UUID' })
  id: string;
}
