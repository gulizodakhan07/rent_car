import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Car } from './car.model.js';
import { CarService } from './car.service.js';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carService.findOne(id);
  }

  @Post()
  create(@Body() car: Car): Promise<Car> {
    return this.carService.create(car);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() car: Car): Promise<[number, Car[]]> {
    return this.carService.update(id, car);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.carService.remove(id);
  }
}
