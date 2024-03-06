import { Length } from 'class-validator';

export class UpdateProductDescriptionDto {
  @Length(0, 255)
  description: string;
}
