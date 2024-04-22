import { Injectable } from '@nestjs/common';
import { UpdateUserAccountDto } from '../dtos/UpdateUserAccount.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '@src/employees/entities/Employee';

@Injectable()
export class UpdateAccountUseCase {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async execute(id: string, updateUserAccountDto: UpdateUserAccountDto) {
    await this.repository.update(id, updateUserAccountDto);
  }
}
