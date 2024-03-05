import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeCreator: EmployeeCreator) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<void> {
    this.employeCreator.create(createEmployeeDto);
  }
}
