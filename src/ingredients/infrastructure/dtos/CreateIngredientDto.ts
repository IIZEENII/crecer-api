import { UnitType } from 'src/ingredients/domain/UnitType';

export class CreateIngredientDto {
  name: string;
  price: number;
  stock: number;
  unitType: UnitType;
}
