import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { UnitType } from 'src/ingredients/domain/UnitType';

export class CreateIngredientDto {
  @IsString()
  @Length(1, 64)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsEnum(UnitType)
  unitType: UnitType;
}
