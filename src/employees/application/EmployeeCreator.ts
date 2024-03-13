import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../domain/Employee';
import { CreateEmployeeDto } from '../infrastructure/dtos/CreateEmployee.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeCreator {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    await this.employeeRepository.save(createEmployeeDto);
  }
}
