import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import AppLog from '@/logger/app-log.service';
import { Week3Payload } from './utils/week3.payload.interface';
import { MESSAGE_PATTERN, QUEUE_NAME } from './const/const';

@Injectable()
export class Week3Service {
    private packetCounter: number = 0;
    private readonly deviceId: number = 11;
    private currentTemperature: number = 30;
    private currentHumidity: number = 60;
    private isInitialized: boolean = false;

    constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) { }

    async initialize() {
        await this.client.connect().catch((err) => {
            AppLog.error('[WEEK 3][ERROR] Failed to connect to RabbitMQ:', err.message);
            process.exit(0);
        });
        AppLog.info('[WEEK 3][INFO] RabbitMQ connected successfully');
        this.isInitialized = true;
    }

    send() {
        if (!this.isInitialized) return;

        this.packetCounter++;

        this.currentTemperature = Math.floor(Math.random() * 30) + 10; // random from 10-40`C
        this.currentHumidity = Math.floor(Math.random() * 30) + 55; // random from 55-85%

        const payload: Week3Payload = {
            deviceId: this.deviceId,
            packetNo: this.packetCounter,
            temperature: this.currentTemperature,
            humidity: this.currentHumidity
        };
        this.client.emit(MESSAGE_PATTERN, JSON.stringify(payload));

        AppLog.info(`[WEEK 3][SENDER] Sent successfully to queue ${QUEUE_NAME}, payload: ${JSON.stringify(payload)}`);
    }
}
