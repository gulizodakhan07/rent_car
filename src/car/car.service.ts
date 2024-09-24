import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './car.model.js';
import { ApiFeature } from 'src/utils/api-feature.utils.js';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car)
    private carModel: typeof Car,
  ) {}

  async findAll(): Promise<Car[]> {
    const query = new ApiFeature('cars')
    query.limitFields()
    query.sort()
    query.filter()
    query.paginate()
    query.getQuery()
    return this.carModel.findAll();
  }

  async findOne(id: number): Promise<Car> {
    return this.carModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(car: Car): Promise<Car> {
    return this.carModel.create(car);
  }

  async update(id: number, car: Car): Promise<[number, Car[]]> {
    return this.carModel.update(car, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    if (car) {
      await car.destroy();
    }
  }
}
