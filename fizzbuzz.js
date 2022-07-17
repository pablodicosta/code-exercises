const isMultipleOf = (a, b) => !(a % b);

const fizzBuzz = n => {
  const m = isMultipleOf(n, 15)
        ? "fizz-buzz"
        : isMultipleOf(n, 3)
        ? "fizz"
        : isMultipleOf(n, 5)
        ? "buzz"
        : n;
  if (n === 1) return [m];
  return [...fizzBuzz(n - 1), m];
}

console.log(`${fizzBuzz(16)}`);
