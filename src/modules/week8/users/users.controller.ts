import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Get()
    getAll() {
        return this.service.findAll();
    }

    @Post()
    @ApiBody({ type: UserDto })
    create(@Body() body) {
        return this.service.create(body);
    }

    @Put(':id')
    @ApiBody({ type: UserDto })
    update(@Param('id') id: string, @Body() body: UserDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
