import { Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { Transporter, createTransport } from 'nodemailer';
import { MailTempleteConfig } from './interfaces/MailTempleteConfig';
import { MailSenderOptions } from './interfaces/MailSenderOptions';
import { MailConfig } from './interfaces/MailConfig';
import { MODULE_OPTIONS_TOKEN } from './ConfigModuleDefinition';

@Injectable()
export class MailService {
  private readonly mailTempleteConfig: MailTempleteConfig;
  private readonly transporter: Transporter;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    { templete, ...tranporterOptions }: MailConfig,
  ) {
    this.transporter = createTransport(tranporterOptions);
    this.mailTempleteConfig = templete;
  }

  async sendMail(mailSenderOptions: MailSenderOptions): Promise<void> {
    const templeteAbsolutePath = join(
      this.mailTempleteConfig.dir,
      mailSenderOptions.templeteName,
    );

    const compiledTemplete = this.mailTempleteConfig.adapter.compile(
      templeteAbsolutePath,
      { ...mailSenderOptions.templeteData },
    );

    await this.transporter.sendMail({
      to: mailSenderOptions.to,
      subject: mailSenderOptions.subject,
      html: compiledTemplete,
    });
  }
}
