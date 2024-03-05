import { Length } from 'class-validator';

export class CreateRecipeDto {
  @Length(1, 64)
  title: string;
}
