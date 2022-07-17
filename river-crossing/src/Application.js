import * as read from 'readline-sync';
import { Coast } from './Coast';
import { Boat } from './Boat';

export class Application {

  constructor() {
    this.boat = new Boat();
  }

  run() {
    let repeat = true;
    while (repeat) {      
      this.gameLoop();
      repeat = read.keyInYN('Try Again?', { hideEchoBack: true });      
    }
  }

  gameLoop() {
    let originCoast = new Coast('A', { wolves: 3, monkeys: 3 });
    let destinationCoast = new Coast('B', { wolves: 0, monkeys: 0 });

    while (true) {

      console.log(`\n${originCoast}\n${destinationCoast}\n`);

      let exit = !this.doTravel(`Who will cross to coast ${destinationCoast._name}?`, originCoast, destinationCoast);
      if (exit) break;
      if (originCoast._monkeys === 0 && originCoast._wolves === 0) {
        console.log(`All monkeys are on coast ${destinationCoast._name}\nYOW WON THE GAME!!`);
        break;
      }

      exit = !this.doTravel(`Who will go back to coast ${originCoast._name}?`, destinationCoast, originCoast);
      if (exit) break;
    }
  }
  
  doTravel(prompt, origin, destination) {
    let ok = false;
    while (!ok) {
      let animals = this.getInput(prompt);
      if (!animals) return false;
      ok = this.boat.travel(origin, destination, animals);
    }
    return true;
  }

  getInput(prompt) {
    let input = read.question(`${prompt}\nWolf [w], Monkey [m] (comma separated) or Exit [e] `,
      { limit: /(^(w|m)(,(w|m))?$)|^e$/ });
    if (input === 'e') return false;
    input = input.split(',');
    return {
      wolves: input.filter(x => x === 'w').length,
      monkeys: input.filter(x => x === 'm').length
    };
  }

}