import Tree from "./Tree.js";
import { prettyPrint } from "./prettyPrint.js";

// Create a binary search tree from the given array
let tree = Tree.create([1, 2, 5, 6, 7, 7, 6, 6, 4, 5, 9, 565, 3, 8, 4]);

// Print the binary search tree
prettyPrint(tree.root);

tree.insert(10);

console.log("tree.insert(10):\n");
prettyPrint(tree.root);

tree.deleteNode(1);

console.log("tree.deleteNode(1):\n");
prettyPrint(tree.root);

tree.deleteNode(3);

console.log("tree.deleteNode(3):\n");
prettyPrint(tree.root);

tree.deleteNode(5);

console.log("delete root: " + "tree.deleteNode(5):\n");
prettyPrint(tree.root);
console.log("tree.levelOrder():\n" + tree.levelOrder());

console.log("tree.preOrder():\n" + tree.preOrder());
console.log("tree.inOrder():\n" + tree.inOrder());
console.log("tree.postOrder():\n" + tree.postOrder());

console.log("tree.height(tree.find(6)):" + tree.height(tree.find(6).node));
