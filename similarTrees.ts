/*
For this question we describe two binary trees A and B as similar when tree A 
has the same number of nodes at each level as tree B and viceversa.
The goal is to write a function that will validate if both trees are similar.
If this is correct the function should return true, otherwise false.

Hint: Trees being similar and trees being equal is not the same.
*/

class BinaryTreeNode {
  binaryNodeValue: string;
  rightBinaryNode?: BinaryTreeNode;
  leftBinaryNode?: BinaryTreeNode;

  constructor(binaryNodeValue: string, rightBinaryNode?: BinaryTreeNode, leftBinaryNode?: BinaryTreeNode) {
    this.binaryNodeValue = binaryNodeValue;
    this.rightBinaryNode = rightBinaryNode;
    this.leftBinaryNode = leftBinaryNode;
  }
}

function getChildNodes(nodes: BinaryTreeNode[]): BinaryTreeNode[] {
  let children: BinaryTreeNode[] = [];
  nodes.forEach(node => {
    if (node.leftBinaryNode) children.push(node.leftBinaryNode);
    if (node.rightBinaryNode) children.push(node.rightBinaryNode);
  });
  return children;
}

function similarTrees(firstTree?: BinaryTreeNode, secondTree?: BinaryTreeNode): boolean {
  let firstCurrentLevel: any = [firstTree];
  let secondCurrentLevel: any = [secondTree];
  let firstChildNodes, secondChildNodes;

  do {
    firstChildNodes = getChildNodes(firstCurrentLevel);
    secondChildNodes = getChildNodes(secondCurrentLevel);
    if (firstChildNodes.length !== secondChildNodes.length) return false;
    firstCurrentLevel = firstChildNodes;
    secondCurrentLevel = secondChildNodes;
  } while (firstChildNodes.length && secondChildNodes.length);

  return true;
}

const firstTree = new BinaryTreeNode("asd",
  new BinaryTreeNode("asd", undefined,
    new BinaryTreeNode("asd",
      new BinaryTreeNode("asd", undefined, undefined)
    )
  ),
  new BinaryTreeNode("asd",
    new BinaryTreeNode("asd", undefined, undefined),
    new BinaryTreeNode("asd", undefined, undefined)
  )
);

const secondTree = new BinaryTreeNode("zxc",
  new BinaryTreeNode("zxc",
    new BinaryTreeNode("zxc", undefined, undefined),
    undefined
  ),
  new BinaryTreeNode("zxc",
    undefined,
    new BinaryTreeNode("zxc", undefined, undefined)
  )
);

const thirdTree = new BinaryTreeNode("zxc",
  new BinaryTreeNode("zxc",
    undefined,
    new BinaryTreeNode("zxc", undefined, undefined)
  ),
  new BinaryTreeNode("zxc",
    new BinaryTreeNode("zxc", undefined, undefined),
    undefined
  )
);

const fourthTree = new BinaryTreeNode("zcv",
  new BinaryTreeNode("zxc", undefined, undefined),
  new BinaryTreeNode("zxc", undefined, undefined)
);

const fifthTree = new BinaryTreeNode("zcv",
  new BinaryTreeNode("zxc", undefined, undefined),
  undefined
);



console.log(similarTrees(fourthTree, fifthTree));
