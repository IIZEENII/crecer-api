import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MailConfig } from './interfaces/MailConfig';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MailConfig>()
    .setExtras({ isGlobal: true }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
