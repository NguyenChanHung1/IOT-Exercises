import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Week1Module } from './week1/week1.module';
import { Week2Module } from './week2/week2.module';

@Module({
  imports: [
    AppModule,
    Week1Module,
    Week2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
