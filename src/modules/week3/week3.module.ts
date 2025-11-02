import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { BROKER_URL, QUEUE_NAME } from './const/const';
import { Week3Controller } from './week3.controller';
import { Week3Service } from './week3.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    url: [BROKER_URL],
                    queue: QUEUE_NAME,
                    queueOptions: { durable: false },
                },
            },
        ]),
    ],
    controllers: [Week3Controller],
    providers: [Week3Service],
    exports: [Week3Service],
})
export class Week3Module { }
