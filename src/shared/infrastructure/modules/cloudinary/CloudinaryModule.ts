import { Module } from '@nestjs/common';
import { CloudinaryService } from './CloudinaryService';
import { ConfigurableModuleClass } from './ConfigModuleDefinition';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule extends ConfigurableModuleClass {}
