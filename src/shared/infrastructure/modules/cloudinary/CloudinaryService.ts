import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './ConfigModuleDefinition';
import {
  ConfigOptions,
  UploadApiResponse,
  v2 as cloudinaryClient,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloudinaryClient = cloudinaryClient;
  constructor(@Inject(MODULE_OPTIONS_TOKEN) configOptions: ConfigOptions) {
    this.cloudinaryClient.config(configOptions);
  }

  async upload(
    file: Express.Multer.File,
    publicId: string,
  ): Promise<UploadApiResponse> {
    try {
      const base64URL = Buffer.from(file.buffer).toString('base64');
      const dataURI = 'data:' + file.mimetype + ';base64,' + base64URL;
      return await this.cloudinaryClient.uploader.upload(dataURI, {
        resource_type: 'auto',
        public_id: publicId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(resourcePublicId: string): Promise<any> {
    try {
      return await this.cloudinaryClient.uploader.destroy(resourcePublicId);
    } catch (error) {
      console.error(error);
    }
  }
}
