import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../domain/employee';
import { CreateEmployeeDto } from '../infrastructure/dtos/create-employee.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeCreator {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    const employeeCreated = this.employeeRepository.create(createEmployeeDto);
    this.employeeRepository.save(employeeCreated);
  }
}
