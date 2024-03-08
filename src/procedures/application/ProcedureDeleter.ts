import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';
import { Repository } from 'typeorm';

@Injectable()
export class ProcedureDeleter {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async delete(id: string): Promise<void> {
    this.procedureRepository.delete(id);
  }
}
