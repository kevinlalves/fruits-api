import { FruitInput } from "../services/fruits-service";

export type Fruit = {
  id: number;
  name: string;
  price: number;
};

class FruitsDb {
  private fruits: Fruit[];

  constructor(initialFruits: Fruit[] = []) {
    this.fruits = initialFruits;
  }

  getFruits(): Fruit[] {
    return this.fruits;
  }

  getSpecificFruit(id: number): Fruit | undefined {
    return this.fruits.find((fruit) => {
      return fruit.id === id;
    });
  }

  getSpecificFruitByName(name: string): Fruit | undefined {
    return this.fruits.find((fruit) => {
      return fruit.name === name;
    });
  }

  insertFruit(fruit: FruitInput) {
    const id = this.fruits.length + 1;
    this.fruits.push({ ...fruit, id }); // unique id
  }

  clean() {
    this.fruits.length = 0;
  }
}

export default FruitsDb;
