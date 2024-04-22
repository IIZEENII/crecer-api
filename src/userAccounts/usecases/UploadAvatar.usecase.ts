import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@src/shared/infrastructure/modules/cloudinary/CloudinaryService';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadAvatarUsecase {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async execute(
    file: Express.Multer.File,
    publicId: string,
  ): Promise<UploadApiResponse> {
    return await this.cloudinaryService.upload(file, publicId);
  }
}
