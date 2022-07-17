let buildTree = (expArray, operators, index) => {
  if (expArray.length <= 1)
    return {
      operand: expArray[0],
    };
  for (let i = expArray.length - 1; i > 0; i--) {
    let token = expArray[i];
    if (operators[index].includes(token)) {
      return {
        leftSide: buildTree(expArray.slice(0, i), operators, index),
        rightSide: buildTree(expArray.slice(i + 1), operators, index + 1),
        operator: token,
      };
    }
  }
  return buildTree(expArray, operators, index + 1);
};

let solveTree = (root) => {
  if (root.operand) return Number(root.operand);
  if (root.operator) {
    let leftSide = Number(solveTree(root.leftSide));
    let rightSide = Number(solveTree(root.rightSide));
    switch (root.operator) {
      case "+":
        return leftSide + rightSide;
      case "-":
        return leftSide - rightSide;
      case "*":
        return leftSide * rightSide;
      case "/":
        return leftSide / rightSide;
    }
  }
};

let solve = (exp) => {
  let operators = {
    1: ["+", "-"],
    2: ["*", "/"],
  };

  let expArray = exp.match(/[^\+\-\*\/]+|[\+\-\*\/]/g);
  let expTree = buildTree(expArray, operators, 1);
  let result = solveTree(expTree);

  return result;
};

let result = solve("1-3/2");

console.log(result);
