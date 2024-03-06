import { Privacity } from '@src/recipes/domain/Privacity';
import { Categories } from '@src/shared/domain/Categories';
import { IsEnum, Length } from 'class-validator';

export class CreateRecipeDto {
  @Length(1, 64)
  title: string;

  @Length(10, 64)
  bookCover: string;

  @IsEnum(Categories)
  category: Categories;

  @IsEnum(Privacity)
  privacity: Privacity;
}
