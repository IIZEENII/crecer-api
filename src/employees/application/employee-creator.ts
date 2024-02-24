import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empoloyee } from '../domain/employee';
import { CreateEmployeeDto } from '../infrastructure/dtos/create-employee.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeCreator {
  constructor(
    @InjectRepository(Empoloyee)
    private readonly employeeRepository: Repository<Empoloyee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    const employeeCreated = this.employeeRepository.create(createEmployeeDto);
    this.employeeRepository.save(employeeCreated);
  }
}
