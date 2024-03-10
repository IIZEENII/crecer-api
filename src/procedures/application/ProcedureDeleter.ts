import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '@src/procedures/domain/Producedure';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedureDeleter {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async delete(procedure: Procedure): Promise<void> {
    try {
      await this.procedureRepository.remove(procedure);
    } catch (error) {
      console.log(error);
    }
  }
}
