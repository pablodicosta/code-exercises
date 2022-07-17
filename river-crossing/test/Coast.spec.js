import * as assert from 'assert';
import { Coast } from '../src/Coast';

describe('Coast', () => {

  let coast;

  beforeEach(() => {
    coast = new Coast('A', { wolves: 3, monkeys: 3 });
  })

  it('Should add animals', () => {
    coast.addAnimals({ wolves: 2, monkeys: 4 });
    assert.equal(coast._wolves, 5);
    assert.equal(coast._monkeys, 7);
  });

  it('Should remove animals', () => {
    coast.removeAnimals({ wolves: 2, monkeys: 1 });
    assert.equal(coast._wolves, 1);
    assert.equal(coast._monkeys, 2);
  });

  it('Should validate when adding animals', () => {
    let result = coast.validateAdd({ wolves: 2, monkeys: 3 });
    assert.equal(result, true);
  });

  it('Should not validate when adding animals', () => {
    let result = coast.validateAdd({ wolves: 5, monkeys: 3 });
    assert.equal(result, false);
  });

  it('Should fail when not enough animals', () => {
    assert.throws(() => coast.validateRemove({ wolves: 4, monkeys: 0}),
      Error, 'Not enough wolves');
  });

  it('Should validate when removing animals', () => {
    let result = coast.validateRemove({ wolves: 2, monkeys: 1 });
    assert.equal(result, true);
  });

  it('Should not validate when removing animals', () => {
    let result = coast.validateRemove({ wolves: 1, monkeys: 2 });
    assert.equal(result, false);
  });

});
