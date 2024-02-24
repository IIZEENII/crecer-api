import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empoloyee } from '../domain/employee';
import { EmployeeCreator } from '../application/employee-creator';

@Module({
  imports: [TypeOrmModule.forFeature([Empoloyee])],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeCreator],
})
export class EmployeesModule {}
