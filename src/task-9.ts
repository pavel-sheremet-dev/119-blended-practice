interface Container<T> {
  items: T[];
  addItem: (item: T) => void;
  getItem: (index: number) => T;
}

interface User {
  id: string;
  name: string;
  age: number;
}

const createContainer = <T>(initalValues: T[]): Container<T> => {
  const createdContainer: Container<T> = {
    items: initalValues,
    addItem(item) {
      this.items.push(item);
    },
    getItem(idx) {
      return this.items[idx];
    },
  };

  return createdContainer;
};

const numberContainer = createContainer<number>([1, 2, 3, 4, 5]);
const stringContainer = createContainer<string>(["test", "qwerty"]);
const userContainer = createContainer<User>([
  { id: "1", name: "Pasha", age: 10 },
]);

console.log(numberContainer, stringContainer, userContainer);
