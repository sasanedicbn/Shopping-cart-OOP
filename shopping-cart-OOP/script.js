import { cars as data } from "./data";
const car = document.querySelector(".car");
const sortOptions = document.querySelector(".sortOptions");
const availability = document.querySelector(".availability");

class LogicCars {
  constructor(data) {
    this.cars = [...data];
    this.filteredCars = [...this.cars];
  }

  displayCars(elementCars) {
    car.innerHTML = "";
    console.log(elementCars);
    elementCars.forEach((data) => {
      const cars = document.createElement("div");

      const backgroundColor =
        data.available === "yes" ? "rgb(91, 199, 91)" : "rgb(214, 81, 81)";
      const availabilityText = data.available === "yes" ? "Yes" : "No";

      cars.innerHTML = `<div class="cart-row"> 
                <div class="first-data">
                    <h1>${data.name}</h1>
                    <img src="${data.image}" alt="${data.image}"/>
                </div>
                <div class="second-data">
                    <p><strong>Brand:</strong> ${data.brand}</p>
                    <p><strong>Manufactured Year:</strong> ${data.manufacturedYear}</p>
                    <p><strong>Doors:</strong> ${data.doors}</p>
                    <p><strong>Price:</strong><span class="price">$${data.price}</span></p>
                </div>
                <p style="background-color: ${backgroundColor};"><strong>Available:</strong> ${availabilityText}</p>
                <button class="deleteCar" data-carId=${data.id}>Delete</button>
            </div>`;

      const deleteButton = cars.querySelector(".deleteCar");
      deleteButton.addEventListener("click", () => {
        this.deleteCar(data.id);
      });
      car.appendChild(cars);
    });
  }

  sortCars(event) {
    const sortingFunctions = {
      az: (a, b) => a.name.localeCompare(b.name),
      za: (a, b) => b.name.localeCompare(a.name),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    };
    const sortingFunction = sortingFunctions[event.target.value];
    if (sortingFunction) {
      this.filteredCars.sort(sortingFunction);
      this.displayCars(this.filteredCars);
    }
  }

  availableCars(event) {
    const [key, value] = event.target.value.split("-");
    console.log(key, value);
    this.filteredCars = [...this.cars];
    this.filteredCars = this.filteredCars.filter(
      (element) => element[key] === value
    );
    this.displayCars(this.filteredCars);
  }

  deleteCar(id) {
    this.filteredCars = this.filteredCars.filter((el) => el.id !== id);
    this.displayCars(this.filteredCars);
  }

  getCars = () => this.filteredCars;
}

const logic = new LogicCars(data);
logic.displayCars(logic.getCars());

availability.addEventListener("click", () => logic.deleteCar());
availability.addEventListener("change", (event) => logic.availableCars(event));
sortOptions.addEventListener("change", (event) => logic.sortCars(event));
