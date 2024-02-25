import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../infrastructure/dtos/create-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from '../domain/recipe';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeCreator {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<void> {
    const recipeCreated = this.recipeRepository.create(createRecipeDto);
    this.recipeRepository.save(recipeCreated);
  }
}
