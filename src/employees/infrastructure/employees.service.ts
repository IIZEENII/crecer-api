import { Injectable } from '@nestjs/common';
import { EmployeeCreator } from '../application/employee-creator';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly employeeCreatro: EmployeeCreator) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    this.employeeCreatro.create(createEmployeeDto);
  }
}
