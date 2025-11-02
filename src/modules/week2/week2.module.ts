import { Module } from '@nestjs/common';
import { Week2Controller } from './week2.controller';
import { Week2Service } from './week2.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BROKER_URL, DEFAULT_CLIENT_ID } from '@/modules/week2/const/const';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: BROKER_URL,
          clientId: DEFAULT_CLIENT_ID,
        },
      },
    ]),
  ],
  controllers: [Week2Controller],
  providers: [Week2Service],
  exports: [Week2Service],
})
export class Week2Module {}
