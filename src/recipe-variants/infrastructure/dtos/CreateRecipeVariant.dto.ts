import { Length } from 'class-validator';

export class CreateRecipeVariantDto {
  @Length(1, 64)
  name: string;
}
