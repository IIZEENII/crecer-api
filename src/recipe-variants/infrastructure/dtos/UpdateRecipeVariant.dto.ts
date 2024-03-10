import { Length } from 'class-validator';

export class UpdateRecipeVariantDto {
  @Length(1, 64)
  name: string;
}
