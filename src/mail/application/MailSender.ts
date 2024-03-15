import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { join } from 'path';
import { SMTP_TRANSPORTER, TEMPLETE_CONFIG } from '../infrastructure/constants';
import { MailTempleteConfig } from '../infrastructure/interfaces/MailTempleteConfig';
import { MailSenderOptions } from '../infrastructure/interfaces/MailSenderOptions';

@Injectable()
export class MailSender {
  constructor(
    @Inject(SMTP_TRANSPORTER) private readonly transporter: Transporter,
    @Inject(TEMPLETE_CONFIG)
    private readonly mailTempleteConfig: MailTempleteConfig,
  ) {}

  async sendMail(mailSenderOptions: MailSenderOptions): Promise<void> {
    const templeteAbsolutePath = join(
      this.mailTempleteConfig.dir,
      mailSenderOptions.templeteName,
    );

    const compiledTemplete = this.mailTempleteConfig.adapter.compile(
      templeteAbsolutePath,
      { ...mailSenderOptions },
    );

    await this.transporter.sendMail({
      to: mailSenderOptions.to,
      subject: mailSenderOptions.subject,
      html: compiledTemplete,
    });
  }
}
