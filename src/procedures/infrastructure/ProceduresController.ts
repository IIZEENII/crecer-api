import { Body, Controller, Post } from '@nestjs/common';
import { CreateProcedureDto } from './dtos/CreateProcedure.dto';
import { ProcedureCreator } from '../application/ProcedureCreator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedures')
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly procedureCreator: ProcedureCreator) {}

  @Post()
  async create(@Body() createProcedureDto: CreateProcedureDto): Promise<void> {
    this.procedureCreator.create(createProcedureDto);
  }
}
