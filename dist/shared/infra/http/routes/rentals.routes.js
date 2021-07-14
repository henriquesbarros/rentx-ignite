"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("@modules/rentals/useCases/CreateRental/CreateRentalController");

var _DevolutionRentalController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _listRentalsByUserController = require("@modules/rentals/useCases/listRentalsByUser/listRentalsByUserController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _listRentalsByUserController.ListRentalsByUserController();
rentalsRoutes.post("/", _ensureAuthenticated.ensuredAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", _ensureAuthenticated.ensuredAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/user", _ensureAuthenticated.ensuredAuthenticated, listRentalsByUserController.handle);