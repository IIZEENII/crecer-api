import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from '../entities/ingredient';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindIngredientByIdUsecase {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async execute(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }
    return ingredient;
  }
}
