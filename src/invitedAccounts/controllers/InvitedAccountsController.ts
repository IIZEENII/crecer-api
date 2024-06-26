import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { RolesGuard } from '@src/shared/infrastructure/guards/RolesGuard';
import { InvitationSender } from '../usecases/InvitationSender';
import { InvitationDeleter } from '../usecases/InvitationDeleter';
import { InvitationFinder } from '../usecases/InvitationFinder';
import { IdParam } from '@src/shared/infrastructure/http/params/IdParam.dto';
import { CreateInvitationDto } from '../dtos/CreateInvitation.dto';
import { InvitedAccount } from '../entities/InvitedAccount';
import { Role } from '@src/employees/enums/Role';
import { InvitationCreator } from '../usecases/InvitationCreator';

@ApiBearerAuth()
@ApiTags('Invited accounts')
@Controller('invited-accounts')
@UseGuards(RolesGuard)
@Roles(Role.MOTHER_ADMIN)
export class InvitedAccountsController {
  constructor(
    private readonly invitationSender: InvitationSender,
    private readonly invitationDeleter: InvitationDeleter,
    private readonly invitationFinder: InvitationFinder,
    private readonly invitationCreator: InvitationCreator,
  ) {}

  @Post()
  async sendInvitationToCollaborate(
    @Body() { recipentEmail }: CreateInvitationDto,
  ): Promise<void> {
    const { email, invitationToken } =
      await this.invitationCreator.create(recipentEmail);
    this.invitationSender.sendInvitationToCollaborate({
      recipentEmail: email,
      invitationToken,
    });
  }

  @Delete(':id')
  async deleteInvitationToCollaborate(@Param() { id }: IdParam): Promise<void> {
    const invitedAccount = await this.invitationFinder.findById(id);
    this.invitationDeleter.deleteInvitationToCollaborate(invitedAccount);
  }

  @Get()
  async findAll(): Promise<InvitedAccount[]> {
    return await this.invitationFinder.findAll();
  }
}
