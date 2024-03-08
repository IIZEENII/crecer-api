import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from '../domain/Producedure';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  controllers: [],
  providers: [],
})
export class ProceduresModule {}
