import { Injectable } from '@nestjs/common';
// import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { MailSender } from '@src/mail/application/MailSender';

// @Injectable()
// export class EmployeeInvitationSender {
//   constructor(private readonly eventEmitter: EventEmitter) {}

//   async sendInvitationToCollaborate(recipentEmail: string) {
//     this.eventEmitter.emit('employee.invitation-send', {
//       recipentEmail,
//     });
//   }
// }

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
