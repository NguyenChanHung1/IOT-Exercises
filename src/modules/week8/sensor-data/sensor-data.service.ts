import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorData } from './sensor-data.schema';
import { SensorDataDto } from './dto/sensor-data.dto';

@Injectable()
export class SensorDataService {
    constructor(
        @InjectModel(SensorData.name)
        private readonly sensorModel: Model<SensorData>,
    ) { }

    findAll() {
        return this.sensorModel.find().exec();
    }

    create(data: SensorDataDto) {
        return this.sensorModel.create(data);
    }

    update(id: string, data: SensorDataDto) {
        return this.sensorModel.findByIdAndUpdate(id, data, { new: true });
    }

    delete(id: string) {
        return this.sensorModel.findByIdAndDelete(id);
    }
}
