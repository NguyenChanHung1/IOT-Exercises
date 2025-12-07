import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SensorData extends Document {
  @Prop({ required: true })
  sensorName: string;

  @Prop({ required: true })
  sensorValue: number;
}

export const SensorDataSchema = SchemaFactory.createForClass(SensorData);
