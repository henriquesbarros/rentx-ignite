import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private respository: Repository<Car>;

    constructor() {
        this.respository = getRepository(Car);
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
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.respository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
            specifications,
            id,
        });

        await this.respository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.respository.findOne({
            license_plate,
        });

        return car;
    }

    async findAvailable(
        name?: string,
        category_id?: string,
        brand?: string
    ): Promise<Car[]> {
        const carsQuery = await this.respository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.respository.findOne(id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.respository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { CarsRepository };
