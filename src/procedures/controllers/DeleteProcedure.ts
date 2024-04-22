import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindProcedureByIdUsecase } from '../usecases/FindProcedureById.usecase';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { DeleteProcedureUsecase } from '../usecases/DeleteProcedure.usecase';

@ApiBearerAuth()
@ApiTags('Procedures')
@Controller('procedures')
export class DeleteProcedureController {
  constructor(
    private readonly findProcedureById: FindProcedureByIdUsecase,
    private readonly deleteProcedure: DeleteProcedureUsecase,
  ) {}

  @Delete(':id')
  async run(@Param() { id }: IdParam): Promise<void> {
    const procedure = await this.findProcedureById.execute(id);
    this.deleteProcedure.execute(procedure);
  }
}
