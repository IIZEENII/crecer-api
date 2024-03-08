import { Repository } from 'typeorm';
import { Recipe } from '../domain/Recipe';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RecipeFinder {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneBy({ id });

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }

  async findWithVariantsById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.variants', 'variant')
      .leftJoinAndSelect('variant.ingredients', 'ingredient')
      .leftJoinAndSelect('variant.procedures', 'procedure')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }

  findWithVariantsAndProductsById(id: string): Promise<Recipe> {
    const recipe = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.variants', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    return recipe;
  }
}
