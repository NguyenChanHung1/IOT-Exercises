import { Module } from '@nestjs/common';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './users/users.schema';
import { SensorData } from './sensor-data/sensor-data.schema';
import { UsersService } from './users/users.service';
import { SensorDataService } from './sensor-data/sensor-data.service';

@Module({
  imports: [
    SensorDataModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: User },
      { name: SensorData.name, schema: SensorData },
    ]),
  ],
  providers: [UsersService, SensorDataService],
  exports: [UsersService, SensorDataService],
})
export class Week8Module {}
