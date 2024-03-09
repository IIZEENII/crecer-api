import { Injectable } from '@nestjs/common';
import { UnitOfWorkForRecipes } from '@src/shared/infrastructure/unit-of-work/UnitOfWorkForRecipes';
import { RecipeVariant } from '../domain/RecipeVariant';
import { CreateProcedureDto } from '@src/procedures/infrastructure/dtos/CreateProcedure.dto';

@Injectable()
export class ProcedureCreatorForRecipeVariant {
  constructor(private readonly unitOfWork: UnitOfWorkForRecipes) {}

  async create(
    recipeVariant: RecipeVariant,
    createProcedureDto: CreateProcedureDto,
  ): Promise<void> {
    try {
      return await this.TryToCreate(recipeVariant, createProcedureDto);
    } catch (error) {
      console.log(error);
      await this.unitOfWork.rollbackTransaction();
    }
  }

  private async TryToCreate(
    recipeVariant: RecipeVariant,
    createProcedureDto: CreateProcedureDto,
  ): Promise<void> {
    await this.unitOfWork.beginTransaction();

    const procedure =
      await this.unitOfWork.procedureRepository.save(createProcedureDto);

    recipeVariant.procedures.push(procedure);
    await this.unitOfWork.recipeVariantRepository.save(recipeVariant);

    await this.unitOfWork.commitTransaction();
  }
}
