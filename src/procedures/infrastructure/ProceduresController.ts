import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProcedureFinder } from '../application/ProcedureFinder';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { ProcedureUpdater } from '../application/ProcedureUpdater';
import { ProcedureDeleter } from '../application/ProcedureDeleter';
import { UpdateProcedureDto } from './dtos/UpdateProcedure.dto';

@ApiBearerAuth()
@ApiTags('Procedures')
@Controller('procedures')
export class ProceduresController {
  constructor(
    private readonly procedureFinder: ProcedureFinder,
    private readonly procedureUpdater: ProcedureUpdater,
    private readonly procedureDeleter: ProcedureDeleter,
  ) {}

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateProcedure: UpdateProcedureDto,
  ): Promise<void> {
    const procedure = await this.procedureFinder.findById(id);
    await this.procedureUpdater.update(procedure.id, updateProcedure);
  }

  @Delete(':id')
  async delete(@Param() { id }: IdParam): Promise<void> {
    const procedure = await this.procedureFinder.findById(id);
    this.procedureDeleter.delete(procedure);
  }
}
