import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IngredientCreator } from '@src/ingredients/application/IngredientCreator';
import { Ingredient } from '@src/ingredients/entities/ingredient';
import { UnitType } from '@src/ingredients/enums/UnitType';
import { Repository } from 'typeorm';

describe('Ingredient Creator Use Case', () => {
  let ingredientCreator: IngredientCreator;
  let ingredientRepository: Repository<Ingredient>;
  const INGREDIENT_REPOSITORY_TOKEN = getRepositoryToken(Ingredient);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientCreator,
        {
          provide: INGREDIENT_REPOSITORY_TOKEN,
          useValue: {
            insert: vi.fn(),
          },
        },
      ],
    }).compile();

    ingredientCreator = app.get<IngredientCreator>(IngredientCreator);
    ingredientRepository = app.get(INGREDIENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(ingredientCreator).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(ingredientRepository).toBeDefined();
  });

  it('should create a new ingredient item and return void', async () => {
    await ingredientCreator.create({
      name: 'testing ingredient',
      price: 200,
      stock: 12,
      unitType: UnitType.GR,
    });
  });
});
