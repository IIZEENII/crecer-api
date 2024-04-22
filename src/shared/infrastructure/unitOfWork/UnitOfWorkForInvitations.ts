import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { UnitOfWork } from './UnitOfWork';
import { InvitedAccount } from '@src/invitedAccounts/entities/InvitedAccount';
import { Employee } from '@src/employees/entities/Employee';

@Injectable()
export class UnitOfWorkForInvitations implements UnitOfWork {
  private queryRunner: QueryRunner;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async beginTransaction(): Promise<void> {
    this.queryRunner = this.entityManager.connection.createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.commitTransaction();
      await this.releaseQueryRunner();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.rollbackTransaction();
      await this.releaseQueryRunner();
    }
  }

  private async releaseQueryRunner(): Promise<void> {
    if (this.queryRunner) {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  get employeeRepository(): Repository<Employee> {
    return this.queryRunner.manager.getRepository(Employee);
  }

  get invitedAccountRepository(): Repository<InvitedAccount> {
    return this.queryRunner.manager.getRepository(InvitedAccount);
  }
}
