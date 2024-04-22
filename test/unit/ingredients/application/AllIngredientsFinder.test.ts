import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IngredientsFinder } from '@src/ingredients/application/IngredientsFinder';
import { Ingredient } from '@src/ingredients/entities/ingredient';
import { Repository } from 'typeorm';

describe('Ingredient Creator Use Case', () => {
  let allIngredientsFinder: IngredientsFinder;
  let ingredientRepository: Repository<Ingredient>;
  const INGREDIENT_REPOSITORY_TOKEN = getRepositoryToken(Ingredient);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsFinder,
        {
          provide: INGREDIENT_REPOSITORY_TOKEN,
          useValue: {
            find: vi.fn(),
          },
        },
      ],
    }).compile();

    allIngredientsFinder = app.get<IngredientsFinder>(IngredientsFinder);
    ingredientRepository = app.get(INGREDIENT_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(allIngredientsFinder).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(ingredientRepository).toBeDefined();
  });

  it('should find all ingredients items', async () => {
    expect(await allIngredientsFinder.find()).toBe(undefined);
  });
});
