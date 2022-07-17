export class Coast {

  constructor(name, animals) {
    this._wolves = animals.wolves;
    this._monkeys = animals.monkeys;
    this._name = name;
  }

  addAnimals(animals) {    
    this._wolves += animals.wolves;
    this._monkeys += animals.monkeys;
  }

  removeAnimals(animals) {
    this._wolves -= animals.wolves;
    this._monkeys -= animals.monkeys;
  }

  validateAdd(animals) {
    return !(((this._monkeys + animals.monkeys > 0) &&
      (this._wolves + animals.wolves > this._monkeys + animals.monkeys)));
  }

  validateRemove(animals) {
    if (this._wolves - animals.wolves < 0) throw new Error(`Not enough wolves on coast ${this._name}`);
    if (this._monkeys - animals.monkeys < 0) throw new Error(`Not enough monkeys on coast ${this._name}`);
    return !(((this._monkeys - animals.monkeys > 0) &&
      (this._wolves - animals.wolves > this._monkeys - animals.monkeys)));
  }

  toString() {
    return `Coast ${this._name}: ${this._monkeys} monkeys - ${this._wolves} wolves`;
  }

}