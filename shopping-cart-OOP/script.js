import { cars as data } from "./data";
const car = document.querySelector(".car");
const sortOptions = document.querySelector(".sortOptions");
const availability = document.querySelector(".availability");

class LogicCars {
  constructor(data) {
    this.cars = [...data];
    this.filteredCars = [...this.cars];
  }
}
