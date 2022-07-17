export class Boat {

  travel(origin, destination, animals) {
    try {
      if (!origin.validateRemove(animals)) {
        console.log(`There can not be more wolves than monkeys on coast ${origin._name}`);
        return false;      
      }
      if (!destination.validateAdd(animals)) {
        console.log(`There can not be more wolves than monkeys on coast ${destination._name}`);
        return false;      
      }
      origin.removeAnimals(animals);
      destination.addAnimals(animals);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

}