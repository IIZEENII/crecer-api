import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from '@src/employees/domain/Employee';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageMetaDto } from '@src/shared/infrastructure/dtos/PageMeta.dto';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Employee>> {
    const queryBuilder = this.repository.createQueryBuilder('employees');

    queryBuilder
      .orderBy(pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const employees = await queryBuilder.getMany();
    const pageMeta = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(employees, pageMeta);
  }
}
