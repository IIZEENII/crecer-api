import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '@src/employees/entities/Employee';

@Injectable()
export class FindAccountByIdUsecase {
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
