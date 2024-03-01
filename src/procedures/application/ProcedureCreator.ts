import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';
import { Repository } from 'typeorm';
import { CreateProcedureDto } from '../infrastructure/dtos/CreateProcedureDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcedureCreator {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async create(createProcedureDto: CreateProcedureDto): Promise<void> {
    const procedureCreated =
      this.procedureRepository.create(createProcedureDto);
    this.procedureRepository.save(procedureCreated);
  }
}
