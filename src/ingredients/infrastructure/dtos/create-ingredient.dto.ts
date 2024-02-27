import { MeasurementUnits } from 'src/ingredients/domain/measurement-units';

export class CreateIngredientDto {
  name: string;
  price: number;
  stock: number;
  measurementUnit: MeasurementUnits;
}
