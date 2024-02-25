import { Body, Controller, Post } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dtos/create-procedure.dto';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  async create(@Body() createProcedureDto: CreateProcedureDto): Promise<void> {
    this.proceduresService.create(createProcedureDto);
  }
}
