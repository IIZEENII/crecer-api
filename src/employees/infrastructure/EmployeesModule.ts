import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmployeesController } from './EmployeesController';
import { Employee } from '../domain/Employee';
import { EmployeeCreator } from '../application/EmployeeCreator';
import { EmployeeFinder } from '../application/EmployeeFinder';
import { EmployeeInvitationSender } from '../application/EmployeeInvitationSender';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), EventEmitterModule.forRoot()],
  controllers: [EmployeesController],
  providers: [EmployeeCreator, EmployeeFinder, EmployeeInvitationSender],
  exports: [EmployeeFinder],
})
export class EmployeesModule {}
