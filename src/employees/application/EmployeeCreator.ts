import { CreateEmployeeDto } from '../infrastructure/dtos/CreateEmployee.dto';
import { Injectable } from '@nestjs/common';
import { UnitOfWorkForInvitations } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForInvitations';

@Injectable()
export class EmployeeCreator {
  constructor(private readonly unitOfWork: UnitOfWorkForInvitations) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    try {
      await this.unitOfWork.beginTransaction();
      await this.unitOfWork.employeeRepository.save(createEmployeeDto);
      await this.unitOfWork.invitedAccountRepository.delete({
        email: createEmployeeDto.email,
      });
      await this.unitOfWork.commitTransaction();
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
