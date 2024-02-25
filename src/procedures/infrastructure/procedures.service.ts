import { Injectable } from '@nestjs/common';
import { ProcedureCreator } from '../application/procedure-creator';
import { CreateProcedureDto } from './dtos/create-procedure.dto';

@Injectable()
export class ProceduresService {
  constructor(private readonly procedureCreator: ProcedureCreator) {}

  async create(createProcedureDto: CreateProcedureDto): Promise<void> {
    this.procedureCreator.create(createProcedureDto);
  }
}
