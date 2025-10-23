import { Controller, Get, Post } from '@nestjs/common';
import { Week2Service } from './week2.service';
import AppLog from '@/logger/app-log.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MQTT_TOPIC } from './const/const';
import { Week2Payload } from './utils/week2Payload.interface';

@Controller('week2')
export class Week2Controller {
    private lastPacketNo: number = 0;

    constructor(private service: Week2Service) {}

    @MessagePattern(MQTT_TOPIC)
    handleTelemetry(@Payload() data: Week2Payload | string): void {
        let payload: Week2Payload;

        if (typeof data === 'string') {
            try {
                payload = JSON.parse(data) as Week2Payload;
            } catch (e) {
                AppLog.error('[WEEK 2][ERROR] Failed to parse payload:', data);
                return;
            }
        }
        else {
            payload = data;
        }

        if (payload.packetNo <= this.lastPacketNo) {
            AppLog.warn(`[WEEK 2][WARNING] Packet expired, received packet number: ${payload.packetNo}, while last packet: ${this.lastPacketNo}`);
        }
        this.lastPacketNo = payload.packetNo;

        AppLog.info(`MQTT MESSAGE RECEIVED:\nDevice ID:\t${payload.deviceId}
            \nPacket No.:\t${payload.packetNo}\nTemperature:\t${payload.temperature}
            \nHumidity:\t${payload.humidity}`);
    }
}
