import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@src/shared/infrastructure/modules/cloudinary/CloudinaryService';

@Injectable()
export class RemoveAvatarByIdUsecase {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async execute(avatarImagePublicId: string): Promise<void> {
    this.cloudinaryService.remove(avatarImagePublicId);
  }
}
