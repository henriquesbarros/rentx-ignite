import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController";

import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensuredAuthenticated, createRentalController.handle);
rentalsRoutes.post(
    "/devolution/:id",
    ensuredAuthenticated,
    devolutionRentalController.handle
);
rentalsRoutes.get(
    "/user",
    ensuredAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRoutes };
