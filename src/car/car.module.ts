import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './car.model.js';
import { CarService } from './car.service.js';
import { CarController } from './car.controller.js';

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
