"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.respository = void 0;
    this.respository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    specifications,
    id
  }) {
    const car = this.respository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      specifications,
      id
    });
    await this.respository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.respository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(name, category_id, brand) {
    const carsQuery = await this.respository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.respository.findOne(id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.respository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;