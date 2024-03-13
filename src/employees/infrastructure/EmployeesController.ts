import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../domain/Employee';
import { EmployeeFinder } from '../application/EmployeeFinder';

@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeCreator: EmployeeCreator,
    private readonly employeFinder: EmployeeFinder,
  ) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<void> {
    return this.employeCreator.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return await this.employeFinder.findAll();
  }
}
