/*
    1. Find all valid phone numbers
    
    Find the number of all valid (and different) phone numbers on a keyboard laid as follows:
    1	2	3
    4	5	6
    7	8	9
    *	0	#

    A valid phone number is defined as:
    The bounce between consecutive digits has always to be a valid “Horse Chess-Move”, for example 1 to 8 or 1 to 6, and so on…
    A phone number should not begin with 0
    A phone number has always 7 digits

    You are allowed to use any programming language you prefer.                        
*/

const MAX_COLUMNS = 3;
const MAX_ROWS = 4;
const MAX_DIGITS = 7;

// Obtener digito segun coordenadas
const getKeyboardDigit = ({ x, y }) => x === MAX_ROWS - 1 ? y === 1 ? 0 : null : x * MAX_COLUMNS + y + 1;

// Obtener coordenadas de un digito
const getKeyboardCoordinates = digit => digit === 0 ? ({ x: MAX_ROWS - 1, y: 1 }) :
  ({ x: Math.ceil(digit / (MAX_ROWS - 1)) - 1, y: (digit - 1) % MAX_COLUMNS });

// Obtener numeros dentro de un rango
const getSteps = (a, b) => {
  const steps = [];
  const sign = Math.sign(b - a);

  for (let i = a + sign; i !== b + sign; i += sign)
    steps.push(i);

  return steps;
}

// Obtener posibles caminos de caballo entre dos coordenadas
const getHorsePaths = ({ origin, destiny }) => ([
  [
    ...getSteps(origin.x, destiny.x).map(x => ({ x, y: origin.y })),
    ...getSteps(origin.y, destiny.y).map(y => ({ x: destiny.x, y }))
  ],
  [
    ...getSteps(origin.y, destiny.y).map(y => ({ x: origin.x, y })),
    ...getSteps(origin.x, destiny.x).map(x => ({ x, y: destiny.y }))
  ]
]);

// Simular saltos validos de caballo segun coordenadas
const horseJump = ({ x, y }) => {
  const moves = [];

  moves.push({ x: x + 2, y: y + 1 });
  moves.push({ x: x + 2, y: y - 1 });
  moves.push({ x: x - 2, y: y + 1 });
  moves.push({ x: x - 2, y: y - 1 });
  moves.push({ x: x + 1, y: y + 2 });
  moves.push({ x: x + 1, y: y - 2 });
  moves.push({ x: x - 1, y: y + 2 });
  moves.push({ x: x - 1, y: y - 2 });

  return moves.filter(({ x, y }) => x >= 0 && x < MAX_ROWS && y >= 0 && y < MAX_COLUMNS)
}

// Obtener digitos siguientes validos
const getValidNextDigits = digit => {
  if (isNaN(digit)) return Array(9).fill().map((_, i) => i + 1);

  const digitCoordinates = getKeyboardCoordinates(digit);
  const validDigitCoordinates = horseJump(digitCoordinates);

  return validDigitCoordinates.map(getKeyboardDigit).filter(n => n !== null);
}

// Generar numero recursivamente
const generatePhoneNumbers = (maxLength, number) => {
  let phones = [];

  if (`${number || ''}`.length < maxLength) {
    const currentDigit = Number(`${number}`.split('').pop());
    getValidNextDigits(currentDigit).forEach(validDigit => {

      if (isNaN(currentDigit))
        phones.push(...generatePhoneNumbers(maxLength, `${number || ''}` + `${validDigit}`));
      else
        getHorsePaths({
          origin: getKeyboardCoordinates(currentDigit),
          destiny: getKeyboardCoordinates(validDigit)
        }).filter(path => path.every(coord => getKeyboardDigit(coord) !== null))
          .forEach(path => {
            const validDigits = path.map(getKeyboardDigit).join('');
            phones.push(...generatePhoneNumbers(maxLength, `${number || ''}` + `${validDigits}`));
          })

    });
  }
  else phones.push(number);

  return phones;
}


// PRINCIPAL //////////////////////////////////////////////////////////////////////

console.time("Elapsed time");
const allPhones = generatePhoneNumbers(MAX_DIGITS).sort();

allPhones.forEach(phone => console.log(phone));
console.log('Total phones', allPhones.length);
console.timeEnd("Elapsed time");
