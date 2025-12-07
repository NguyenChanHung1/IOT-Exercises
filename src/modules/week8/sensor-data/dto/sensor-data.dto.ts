import { ApiProperty } from "@nestjs/swagger";

export class SensorDataDto {
    @ApiProperty({ example: 'Random Temp Sensor' })
    sensorName: string;

    @ApiProperty({ example: 23.5 })
    sensorValue: number;
};