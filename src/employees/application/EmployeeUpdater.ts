import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../domain/Employee';
import { Repository } from 'typeorm';
import { UpdateEmployeeDto } from '../infrastructure/dtos/UpdateEmployee.dto';

@Injectable()
export class EmployeeUpdater {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<void> {
    this.employeeRepository.update(id, updateEmployeeDto);
  }
}
