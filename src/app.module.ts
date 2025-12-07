import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Week1Module } from './modules/week1/week1.module';
import { Week2Module } from './modules/week2/week2.module';
import { Week3Module } from './modules/week3/week3.module';
import { Week8Module } from './modules/week8/week8.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    Week1Module,
    Week2Module,
    Week3Module,
    Week8Module,
    MongooseModule.forRoot('mongodb://localhost:27017/appdb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
