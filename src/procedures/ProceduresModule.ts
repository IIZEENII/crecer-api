import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './entities/Producedure';
import { FindProcedureByIdUsecase } from './usecases/FindProcedureById.usecase';
import { DeleteProcedureUsecase } from './usecases/DeleteProcedure.usecase';
import { UpdateProcedureController } from './controllers/ProceduresController';
import { UpdateProcedureUsecase } from './usecases/UpdateProcedure.usecase';
import { DeleteProcedureController } from './controllers/DeleteProcedure';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [UpdateProcedureController, DeleteProcedureController],
  providers: [
    FindProcedureByIdUsecase,
    UpdateProcedureUsecase,
    DeleteProcedureUsecase,
  ],
  exports: [],
})
export class ProceduresModule {}
