import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from '@src/procedures/entities/Producedure';
import { Repository } from 'typeorm';
import { UpdateProcedureDto } from '../dtos/UpdateProcedure.dto';

@Injectable()
export class UpdateProcedureUsecase {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async execute(
    id: string,
    updateProcedure: UpdateProcedureDto,
  ): Promise<void> {
    try {
      await this.procedureRepository.update(id, updateProcedure);
    } catch (error) {
      console.log(error);
    }
  }
}
