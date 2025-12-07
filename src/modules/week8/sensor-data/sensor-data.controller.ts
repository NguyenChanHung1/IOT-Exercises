import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { ApiBody } from '@nestjs/swagger';
import { SensorDataDto } from './dto/sensor-data.dto';

@Controller('sensor-data')
export class SensorDataController {
    constructor(private readonly service: SensorDataService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }

    @Post()
    @ApiBody({ type: SensorDataDto })
    create(@Body() sensorDataDto: SensorDataDto) {
        return this.service.create(sensorDataDto);
    }

    @Put(':id')
    @ApiBody({ type: SensorDataDto })
    update(@Param('id') id: string, @Body() body: SensorDataDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
