import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Employee } from '../entities/Employee';
import { EmployeeFinder } from '../usecases/EmployeeFinder';
import { Role } from '../enums/Role';
import { Roles } from '@src/shared/infrastructure/decorators/Roles';
import { RolesGuard } from '@src/shared/infrastructure/guards/RolesGuard';
import { PageOptionsDto } from '@src/shared/infrastructure/dtos/PageOptions.dto';
import { PageDto } from '@src/shared/infrastructure/dtos/Page.dto';
import { PublicRoute } from '@src/shared/infrastructure/decorators/PublicRoute';

@ApiBearerAuth()
@ApiTags('Employees')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('employees')
// @UseGuards(RolesGuard)
// @Roles(Role.MOTHER_ADMIN)
export class FindAllEmployeesController {
  constructor(private readonly employeFinder: EmployeeFinder) { }

  //TODO: Temporally remove protection
  @PublicRoute()
  @Get()
  async run(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Employee>> {
    return await this.employeFinder.findAll(pageOptionsDto);
  }
}
