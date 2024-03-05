import { IsEnum } from 'class-validator';
import { UnitType } from 'src/ingredients/domain/UnitType';

export class UpdateIngredientUnitTypeDto {
  @IsEnum(UnitType)
  unitType: UnitType;
}
