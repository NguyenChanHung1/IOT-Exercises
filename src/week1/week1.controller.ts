import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { Week1Service } from './week1.service';

@Controller('week1')
export class Week1Controller {
    constructor(private service: Week1Service) {}
}
