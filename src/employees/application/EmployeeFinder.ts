import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../domain/Employee';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeFinder {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ email });

    if (!employee) {
      throw new NotFoundException('this acccount not exists');
    }

    return employee;
  }
}
