import { CategororiesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categororiesRepositoryInMemory: CategororiesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categororiesRepositoryInMemory = new CategororiesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categororiesRepositoryInMemory
        );
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test",
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        const categoryCreated = await categororiesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should be able to create a new category with name exists", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        await expect(
            createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
