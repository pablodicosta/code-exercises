import * as assert from 'assert';
import { Boat } from '../src/Boat';
import { Coast } from '../src/Coast';

describe('Boat', () => {

  let boat;
  let coastA;
  let coastB;

  beforeEach(() => {
    boat = new Boat();
    coastA = new Coast('A', { wolves: 3, monkeys: 3 });
    coastB = new Coast('B', { wolves: 0, monkeys: 0 });
  })

  it('Should perform a valid travel', () => {
    let result = boat.travel(coastA, coastB, { wolves: 1, monkeys: 1 });
    assert.equal(result, true);
  });

  it('Should perform an invalid travel', () => {
    let result = boat.travel(coastA, coastB, { wolves: 0, monkeys: 2 });
    assert.equal(result, false);
  });

  it('Should fail when are not enough animals', () => {
    let result = boat.travel(coastA, coastB, { wolves: 0, monkeys: 4 });
    assert.equal(result, false);
  })
  
});