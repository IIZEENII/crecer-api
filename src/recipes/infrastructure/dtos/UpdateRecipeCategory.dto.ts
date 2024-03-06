import { IsEnum } from 'class-validator';
import { Categories } from 'src/shared/domain/Categories';

export class UpdateRecipeCategoryDto {
  @IsEnum(Categories)
  category: Categories;
}
