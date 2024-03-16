import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '.';
import { EnvGetter } from './EnvGetter';
import { EnvConfigOptions } from './interfaces/EnvConfigOptions';

@Module({})
export class EnvConfigModule {
  constructor() {}

  static register(envConfigOptions: EnvConfigOptions): DynamicModule {
    return {
      global: true,
      module: EnvConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: envConfigOptions,
        },
        EnvGetter,
      ],
      exports: [EnvGetter],
    };
  }
}
