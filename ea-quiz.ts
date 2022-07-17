// given this code, what is its return value and why?

// var k = 0;
// while (k < 5) {
//   setTimeout(() => { function() { console.log(k) } }, k + 500);
// }

/*
 Result:
 5
 5
 5
 5
 5

 setTimeout defers the callbacks execution after the while loop is finished and k has been increased to 5
 so every console log will use the latest value of k
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Reusing the same code from the previous exercise, listed again below.
Suppose that rather than what its outputting today its intention is to output

10
20
30
40
50

In the exercise below, the goal is to adjust the code while keeping the overall approach,
in particular we want to retain the while loop and setTimeout calls.
*/

// Please change the code using Javascript (ES3) to achieve this behavior (output values listed above)

// var k = 0;
// var createLogger = function (i) { return function () { console.log(i); } };
// while (k < 5) {
//   setTimeout(createLogger((k + 1) * 10), k + 500);
//   k++;
// }

// Please change this code into ES2015 to achieve this behavior (please do not copy paste above code,
// the idea is use ES2015 features to write a clean implementation)

// const createLogger = i => () => console.log(i);
// [...Array(5).keys()].forEach(k => setTimeout(createLogger((k + 1) * 10), k + 500));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Please give an exact definition of what this code does
// function f(first: number, second: number): number {
//   if (first == 0) {
//     return second;
//   } else {
//     return f(first - 1, second + 1);
//   }
// }
// console.log(f(5, 3));

/*
This is a recursive function that decreases the first number and increases the second one,
until the second one reaches zero. This is the same as adding both values

function f(first: number, second: number): number {
  return first + second;
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// What would you write to call into the above code and have it return “Hello Uncle Bob”?
// var H = (function () {
//   function User(name) {
//     this.name = name;
//   }

//   var m = function () {
//     return "Hello " + this.name;
//   };

//   User.prototype.doGreeting = m;

//   return User;
// })();

// console.log(new H("Uncle Bob").doGreeting());