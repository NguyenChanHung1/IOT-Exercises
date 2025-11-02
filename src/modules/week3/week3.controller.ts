import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { MESSAGE_PATTERN, QUEUE_NAME } from './const/const';
import { Week3Payload } from './utils/week3.payload.interface';
import AppLog from '@/logger/app-log.service';

@Controller('week3') 
export class Week3Controller {
    @MessagePattern(MESSAGE_PATTERN)
    receive(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();

        try {
            const payload: Week3Payload = JSON.parse(data);
            AppLog.info(
                `[WEEK 3][RECEIVER] Receive message from queue ${QUEUE_NAME}. Payload: ${JSON.stringify(payload, null, 2)}`,
            );

            channel.ack(originalMsg);
        } catch (error) {
            AppLog.error(`[WEEK 3][RECEIVER] Failed to parse payload:`, data, error);
        }
    }
}
