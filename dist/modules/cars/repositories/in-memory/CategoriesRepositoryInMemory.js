"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategororiesRepositoryInMemory = void 0;

var _Category = require("@modules/cars/infra/typeorm/entities/Category");

class CategororiesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async list() {
    const all = this.categories;
    return all;
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
  }

}

exports.CategororiesRepositoryInMemory = CategororiesRepositoryInMemory;