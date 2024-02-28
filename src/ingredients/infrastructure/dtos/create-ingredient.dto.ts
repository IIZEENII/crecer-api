import { UnitType } from 'src/ingredients/domain/unit-types';

export class CreateIngredientDto {
  name: string;
  price: number;
  stock: number;
  unitType: UnitType;
}
