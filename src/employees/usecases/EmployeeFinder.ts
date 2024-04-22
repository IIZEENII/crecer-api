import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entities/Employee';
import { Repository } from 'typeorm';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';

@Injectable()
export class EmployeeFinder {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Employee>> {
    const queryBuilder =
      this.employeeRepository.createQueryBuilder('employees');

    queryBuilder
      .orderBy('employees.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMeta);
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException('this acccount not exists');
    }

    return employee;
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ email });

    if (!employee) {
      throw new NotFoundException('this acccount not exists');
    }

    return employee;
  }
}
