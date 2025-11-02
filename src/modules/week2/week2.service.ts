import { MQTT_TOPIC } from '@/modules/week2/const/const';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import AppLog from '@/logger/app-log.service';
import { Week2Payload } from './utils/week2.payload.interface';

@Injectable()
export class Week2Service {
    private packetCounter: number = 0;
    private readonly deviceId: number = 11;
    private currentTemperature: number = 30;
    private currentHumidity: number = 60;
    private isInitialized: boolean = false;

    constructor(@Inject('MQTT_SERVICE') private client: ClientProxy) {}

    async initialize() {
        await this.client.connect().catch((err) => {
            AppLog.error('[WEEK 2][ERROR] Failed to connect to MQTT Client (Publisher):', err.message);
        });
        AppLog.info('[WEEK 2][INFO] MQTT Client (Publisher) connected successfully');
        this.isInitialized = true;
    }

    @Interval(5000) // sends data every 5s
    publishTelemetry() {
        if (!this.isInitialized) return;

        this.packetCounter++;

        this.currentTemperature = Math.floor(Math.random() * 30) + 10; // random from 10-40`C
        this.currentHumidity = Math.floor(Math.random() * 30) + 55; // random from 55-85%

        const payload: Week2Payload = {
            deviceId: this.deviceId,
            packetNo: this.packetCounter,
            temperature: this.currentTemperature,
            humidity: this.currentHumidity
        };
        this.client.emit(MQTT_TOPIC, payload)
            .subscribe({
                next: () => {
                    AppLog.info(`[WEEK 2][INFO] PUBLISH: Packet #${payload.packetNo} to topic ${MQTT_TOPIC}\n` + JSON.stringify(payload));
                },
                error: (err) => {
                    AppLog.error(`[WEEK 2][INFO] PUBLISH: Failed to publish packet #${payload.packetNo} to topic ${MQTT_TOPIC}:\n`, err);
                }
            });
    }
}