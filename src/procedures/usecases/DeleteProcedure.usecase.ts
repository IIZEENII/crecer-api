import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '@src/procedures/entities/Producedure';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteProcedureUsecase {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async execute(procedure: Procedure): Promise<void> {
    try {
      await this.procedureRepository.remove(procedure);
    } catch (error) {
      console.log(error);
    }
  }
}
