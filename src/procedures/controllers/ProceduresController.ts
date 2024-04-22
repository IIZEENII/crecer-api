import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindProcedureByIdUsecase } from '../usecases/FindProcedureById.usecase';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { UpdateProcedureUsecase } from '../usecases/UpdateProcedure.usecase';
import { UpdateProcedureDto } from '../dtos/UpdateProcedure.dto';

@ApiBearerAuth()
@ApiTags('Procedures')
@Controller('procedures')
export class UpdateProcedureController {
  constructor(
    private readonly findProcedure: FindProcedureByIdUsecase,
    private readonly updateProcedure: UpdateProcedureUsecase,
  ) {}

  @Patch(':id')
  async update(
    @Param() { id }: IdParam,
    @Body() updateProcedure: UpdateProcedureDto,
  ): Promise<void> {
    const procedure = await this.findProcedure.execute(id);
    await this.updateProcedure.execute(procedure.id, updateProcedure);
  }
}
