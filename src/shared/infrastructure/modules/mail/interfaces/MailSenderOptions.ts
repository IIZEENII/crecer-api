export interface MailSenderOptions {
  to: string;
  subject: string;
  templeteName: string;
  templeteData?: any | null;
}
