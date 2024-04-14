import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '@src/employees/domain/Employee';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAccountUseCase {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async execute(id: string) {
    const employeeAccount = await this.repository.findOneBy({ id });

    if (!employeeAccount) {
      throw new NotFoundException('account not exists');
    }

    return employeeAccount;
  }
}
