import { Injectable } from '@nestjs/common';
import { MailSender } from '@src/shared/infrastructure/modules/mail/services/MailSender';

@Injectable()
export class EmployeeInvitationSender {
  constructor(private readonly mailSender: MailSender) {}

  async sendInvitationToCollaborate(recipentEmail: string) {
    const subject = 'Te han invitado a colaborar en CRECER';

    this.mailSender.sendMail({
      subject,
      templeteName: 'send-invitation.hbs',
      to: recipentEmail,
    });
  }
}
