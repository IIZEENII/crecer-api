import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../domain/Employee';
import { EmployeeFinder } from '../application/EmployeeFinder';
import { Role } from '../domain/Role';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { RolesGuard } from '@src/shared/infrastructure/guards/RolesGuard';
import { EmployeeInvitationSender } from '../application/EmployeeInvitationSender';

@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
@UseGuards(RolesGuard)
@Roles(Role.MOTHER_ADMIN)
export class EmployeesController {
  constructor(
    private readonly employeCreator: EmployeeCreator,
    private readonly employeFinder: EmployeeFinder,
    private readonly employeeInvitationSender: EmployeeInvitationSender,
  ) {}

  @Post('send-invitation')
  async sendInvitation(@Query('email') email: string): Promise<void> {
    return this.employeeInvitationSender.sendInvitationToCollaborate(email);
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<void> {
    return this.employeCreator.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return await this.employeFinder.findAll();
  }
}
