import { Module } from '@nestjs/common';
import { MailService } from './MailService';
import { ConfigurableModuleClass } from './ConfigModuleDefinition';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule extends ConfigurableModuleClass {}
