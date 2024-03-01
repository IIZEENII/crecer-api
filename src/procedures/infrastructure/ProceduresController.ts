import { Body, Controller, Post } from '@nestjs/common';
import { CreateProcedureDto } from './dtos/CreateProcedureDto';
import { ProcedureCreator } from '../application/ProcedureCreator';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly procedureCreator: ProcedureCreator) {}

  @Post()
  async create(@Body() createProcedureDto: CreateProcedureDto): Promise<void> {
    this.procedureCreator.create(createProcedureDto);
  }
}
