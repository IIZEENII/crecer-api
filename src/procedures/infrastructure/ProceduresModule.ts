import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';
import { ProcedureFinder } from '../application/ProcedureFinder';
import { ProcedureUpdater } from '../application/ProcedureUpdater';
import { ProcedureDeleter } from '../application/ProcedureDeleter';
import { ProceduresController } from './ProceduresController';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProceduresController],
  providers: [ProcedureFinder, ProcedureUpdater, ProcedureDeleter],
  exports: [],
})
export class ProceduresModule {}
