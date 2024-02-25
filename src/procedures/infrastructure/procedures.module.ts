import { Module } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';
import { ProcedureCreator } from '../application/procedure-creator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '../domain/procedure';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProceduresController],
  providers: [ProceduresService, ProcedureCreator],
})
export class ProceduresModule {}
