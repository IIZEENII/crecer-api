import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../domain/Ingredient';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IngredientFinderById {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async find(id: string): Promise<Ingredient> {
    const ingredientFound = await this.ingredientRepository.findOneBy({ id });

    if (!ingredientFound) {
      throw new NotFoundException('ingredient not found');
    }

    return ingredientFound;
  }
}
