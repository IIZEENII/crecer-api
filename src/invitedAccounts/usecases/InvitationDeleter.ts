import { Injectable } from '@nestjs/common';
import { InvitedAccount } from '../entities/InvitedAccount';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvitationDeleter {
  constructor(
    @InjectRepository(InvitedAccount)
    private readonly invitedAccountRepository: Repository<InvitedAccount>,
  ) {}

  async deleteInvitationToCollaborate(invitedAccount: InvitedAccount) {
    await this.invitedAccountRepository.remove(invitedAccount);
  }
}
