import { IsEmail } from 'class-validator';

export class CreateInvitationDto {
  @IsEmail()
  recipentEmail: string;
}
