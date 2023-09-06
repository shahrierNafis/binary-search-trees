import binaryTree from "./binaryTree.js";
import { prettyPrint } from "./prettyPrint.js";

function ran(amount) {
  let array = [];
  while (amount) {
    array.push(Math.floor(Math.random() * 10000 + 0));
    amount--;
  }
  return array;
}

let tree = binaryTree.create(ran(100));
prettyPrint(tree.root);

console.log(
  "binaryTree.isBalanced(tree.root): " + binaryTree.isBalanced(tree.root)
);

console.log("\x1b[90mtree.levelOrder()\n\x1b[0m" + tree.levelOrder());
console.log("\x1b[90mtree.preOrder()\n\x1b[0m" + tree.preOrder());
console.log("\x1b[90mtree.inOrder()\n\x1b[0m" + tree.inOrder());
console.log("\x1b[90mtree.postOrder()\n\x1b[0m" + tree.postOrder());

ran(10000).forEach((number) => {
  tree.insert(number);
});

console.log("\x1b[91mUnbalancing tree\x1b[0m");
prettyPrint(tree.root);
console.log(
  "binaryTree.isBalanced(tree.root): " + binaryTree.isBalanced(tree.root)
);

console.log("\x1b[90mtree.levelOrder()\n\x1b[0m" + tree.levelOrder());
console.log("\x1b[90mtree.preOrder()\n\x1b[0m" + tree.preOrder());
console.log("\x1b[90mtree.inOrder()\n\x1b[0m" + tree.inOrder());
console.log("\x1b[90mtree.postOrder()\n\x1b[0m" + tree.postOrder());

console.log("\x1b[92mRe-balancing tree\x1b[0m");
tree.rebalance();
prettyPrint(tree.root);
console.log(
  "binaryTree.isBalanced(tree.root): " + binaryTree.isBalanced(tree.root)
);

console.log("\x1b[90mtree.levelOrder()\n\x1b[0m" + tree.levelOrder());
console.log("\x1b[90mtree.preOrder()\n\x1b[0m" + tree.preOrder());
console.log("\x1b[90mtree.inOrder()\n\x1b[0m" + tree.inOrder());
console.log("\x1b[90mtree.postOrder()\n\x1b[0m" + tree.postOrder());
