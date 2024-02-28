import { Injectable } from '@nestjs/common';
import { Recipe } from '../domain/recipe';

// TODO: implement logic for converting pdf to json
@Injectable()
export class RecipePDFGenerator {
  async generatedPDF(recipe: Recipe): Promise<unknown> {
    return recipe;
  }
}
