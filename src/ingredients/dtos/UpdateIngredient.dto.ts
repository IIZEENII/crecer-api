import { UnitType } from '@src/ingredients/enums/UnitType';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateIngredientDto {
  @IsString()
  @Length(1, 64)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsEnum(UnitType)
  unitType: UnitType;
}
