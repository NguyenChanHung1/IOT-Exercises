import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorData, SensorDataSchema } from './sensor-data.schema';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SensorData.name, schema: SensorDataSchema },
    ]),
  ],
  providers: [SensorDataService],
  controllers: [SensorDataController],
})
export class SensorDataModule { }
