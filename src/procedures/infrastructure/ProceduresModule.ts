import { Module } from '@nestjs/common';
import { ProceduresController } from './ProceduresController';
import { ProcedureCreator } from '../application/ProcedureCreator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [ProceduresController],
  providers: [ProcedureCreator],
})
export class ProceduresModule {}
