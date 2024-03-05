import { Module } from '@nestjs/common';
import { EmployeesController } from './EmployeesController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../domain/Employee';
import { EmployeeCreator } from '../application/EmployeeCreator';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeCreator],
})
export class EmployeesModule {}
