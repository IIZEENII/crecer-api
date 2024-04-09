import { MailTempleteConfig } from './MailTempleteConfig';

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  templete: MailTempleteConfig;
}
