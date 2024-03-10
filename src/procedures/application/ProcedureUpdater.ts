import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '@src/procedures/domain/Producedure';
import { Repository } from 'typeorm';
import { UpdateProcedure } from '../infrastructure/dtos/UpdateProcedure.dto';

@Injectable()
export class ProcedureUpdater {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async update(id: string, updateProcedure: UpdateProcedure): Promise<void> {
    try {
      await this.procedureRepository.update(id, updateProcedure);
    } catch (error) {
      console.log(error);
    }
  }
}
