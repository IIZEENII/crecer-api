import * as dotenv from 'dotenv';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '.';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { EnvConfigOptions } from './interfaces/EnvConfigOptions';

@Injectable()
export class EnvGetter {
  private readonly envConfig: dotenv.DotenvParseOutput;

  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: EnvConfigOptions,
  ) {
    const envFile = resolve(this.options.folder, this.options.envFilePath);
    this.envConfig = dotenv.parse(readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
