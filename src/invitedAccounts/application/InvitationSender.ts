import { Injectable } from '@nestjs/common';
import { MailService } from '@src/shared/infrastructure/modules/mail/MailService';

interface MailInvitationOptions {
  recipentEmail: string;
  invitationToken: string;
}

@Injectable()
export class InvitationSender {
  constructor(private readonly mailSender: MailService) {}

  async sendInvitationToCollaborate({
    recipentEmail,
    invitationToken,
  }: MailInvitationOptions) {
    const subject = 'Te han invitado a colaborar en CRECER';

    this.mailSender.sendMail({
      subject,
      templeteName: 'send-invitation.hbs',
      to: recipentEmail,
      templeteData: {
        subject,
        to: recipentEmail,
        invitationToken,
      },
    });
  }
}
