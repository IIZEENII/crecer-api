import { Privacity } from '@src/recipes/domain/Privacity';
import { IsEnum, Length } from 'class-validator';
import { Categories } from 'src/shared/domain/Categories';

export class UpdateRecipeDto {
  @Length(1, 64)
  title: string;

  @Length(10, 255)
  bookCover: string;

  @IsEnum(Categories)
  category: Categories;

  @IsEnum(Privacity)
  privacity: Privacity;
}
