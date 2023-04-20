import database from "../config/database";
import { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

function getFruits() {
  return database.getFruits();
}

function getSpecificFruit(id: number) {
  const fruit = database.getSpecificFruit(id);
  if (!fruit) {
    throw { message: "Fruit not found." };
  }

  return fruit;
}

function createFruit(fruit: FruitInput): void {
  const fruitAlreadyRegistered = database.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw { message: "This fruit already exists!" };
  }

  database.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit,
};

export default fruitsService;
