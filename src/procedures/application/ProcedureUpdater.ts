import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';
import { Repository } from 'typeorm';
import { UpdateProcedureDescription } from '../infrastructure/dtos/UpdateProcedureDescription.dto';

@Injectable()
export class ProcedureUpdater {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async updateDescription(
    id: string,
    updateProcedureDescription: UpdateProcedureDescription,
  ): Promise<void> {
    this.procedureRepository.update(id, updateProcedureDescription);
  }
}
