import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitedAccount } from '../entities/InvitedAccount';
import { Repository } from 'typeorm';

@Injectable()
export class InvitationFinder {
  constructor(
    @InjectRepository(InvitedAccount)
    private readonly invitedAccountRepository: Repository<InvitedAccount>,
  ) {}

  async findById(id: string) {
    const invitedAccount = await this.invitedAccountRepository.findOneBy({
      id,
    });

    if (!invitedAccount) {
      throw new NotFoundException('invited account not exists');
    }

    return invitedAccount;
  }

  async findAll() {
    return await this.invitedAccountRepository.find();
  }

  async findByInvitationToken(invitationToken: string) {
    const invitedAccount = await this.invitedAccountRepository.findOneBy({
      invitationToken,
    });

    if (!invitedAccount) {
      throw new NotFoundException('account invited not exists');
    }

    return invitedAccount;
  }
}
