import { Module } from '@nestjs/common';
import { Week1Controller } from './week1.controller';
import { Week1Service } from './week1.service';

@Module({
  controllers: [Week1Controller],
  providers: [Week1Service],
  exports: [Week1Service],
})
export class Week1Module {}
