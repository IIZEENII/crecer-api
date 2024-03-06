import { Length } from 'class-validator';

// TODO: declare name length estandar for product name global
export class UpdateProductNameDto {
  @Length(1, 32)
  name: string;
}
