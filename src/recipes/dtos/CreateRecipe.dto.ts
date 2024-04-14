import { Privacity } from '@src/recipes/enums/privacity';
import { Category } from '@src/shared/domain/Category';
import { IsEnum, Length } from 'class-validator';

export class CreateRecipeDto {
  @Length(1, 64)
  title: string;

  @Length(10, 255)
  bookCover: string;

  @IsEnum(Category)
  category: Category;

  @IsEnum(Privacity)
  privacity: Privacity;
}
