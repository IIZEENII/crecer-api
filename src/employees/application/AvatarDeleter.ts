import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@src/shared/infrastructure/modules/cloudinary/CloudinaryService';

@Injectable()
export class AvatarDeleter {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async delete(avatarImagePublicId: string): Promise<void> {
    console.log(avatarImagePublicId);
  }
}
