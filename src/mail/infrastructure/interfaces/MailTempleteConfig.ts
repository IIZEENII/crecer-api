import { TempleteAdapter } from '@src/auth/infrastructure/adapters/TempleteAdapter';

export interface MailTempleteConfig {
  dir: string;
  adapter: TempleteAdapter;
}
