import { Length } from 'class-validator';

export class CopyRecipeVariantDto {
  @Length(1, 64)
  nameOfCopy: string;
}
