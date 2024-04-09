import { DynamicModule, Module } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailSender } from './services/MailSender';
import { MailConfig } from './interfaces/MailConfig';
import { SMTP_TRANSPORTER, TEMPLETE_CONFIG } from './constants';

@Module({})
export class MailModule {
  static forRoot({ templete, ...options }: MailConfig): DynamicModule {
    const transporter = MailModule.createTranporter({ ...options });

    return {
      global: true,
      module: MailModule,
      providers: [
        {
          provide: SMTP_TRANSPORTER,
          useValue: transporter,
        },
        {
          provide: TEMPLETE_CONFIG,
          useValue: templete,
        },
        MailSender,
      ],
      exports: [MailSender],
    };
  }

  private static createTranporter(options: SMTPTransport.Options): Transporter {
    return createTransport(options);
  }
}
