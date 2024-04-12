import { BadRequestException, Injectable } from '@nestjs/common';
import { UnitOfWorkForInvitations } from '@src/shared/infrastructure/unitOfWork/UnitOfWorkForInvitations';
import { randomBytes } from 'crypto';
import { InvitedAccount } from '../domain/InvitedAccount';

@Injectable()
export class InvitationCreator {
  constructor(private readonly unitOfWork: UnitOfWorkForInvitations) {}

  async create(email: string): Promise<InvitedAccount> {
    try {
      await this.unitOfWork.beginTransaction();
      await this.ensureIfAccountIsNotRegister(email);
      await this.ensureIfAccountIsNotInvited(email);
      const invitedAccount =
        await this.unitOfWork.invitedAccountRepository.save({
          email,
          invitationToken: this.generateToken(),
        });
      await this.unitOfWork.commitTransaction();
      return invitedAccount;
    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }

  async ensureIfAccountIsNotRegister(email: string) {
    const employee = await this.unitOfWork.employeeRepository.findOneBy({
      email,
    });

    if (employee) {
      throw new BadRequestException('account is alredy registered');
    }
  }

  async ensureIfAccountIsNotInvited(email: string) {
    const invitedAccount =
      await this.unitOfWork.invitedAccountRepository.findOneBy({
        email,
      });

    if (invitedAccount) {
      throw new BadRequestException('account is alredy invited');
    }
  }

  private generateToken(): string {
    return randomBytes(24).toString('hex');
  }
}
