import { Module } from '@nestjs/common';
import { EmployeesController } from './EmployeesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../domain/Employee';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { EmployeeFinder } from '../application/EmployeeFinder';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeCreator, EmployeeFinder],
  exports: [EmployeeFinder],
})
export class EmployeesModule {}
