import { Privacity } from '@src/recipes/enums/privacity';
import { IsEnum, Length } from 'class-validator';
import { Category } from '@src/shared/domain/Category';

export class UpdateRecipeDto {
  @Length(1, 64)
  title: string;

  @Length(10, 255)
  bookCover: string;

  @IsEnum(Category)
  category: Category;

  @IsEnum(Privacity)
  privacity: Privacity;
}
