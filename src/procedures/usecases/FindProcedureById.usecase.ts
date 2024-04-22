import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '../entities/Producedure';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindProcedureByIdUsecase {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async execute(id: string): Promise<Procedure> {
    const procedure = await this.procedureRepository.findOneBy({ id });

    if (!procedure) {
      throw new NotFoundException('procedure not found');
    }

    return procedure;
  }
}
