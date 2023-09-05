import Tree from "./Tree.js";
import { prettyPrint } from "./prettyPrint.js";

// Create a binary search tree from the given array
let tree = Tree.create([1, 2, 5, 6, 7, 7, 6, 6, 4, 5, 9, 565, 3, 8, 4]);

// Print the binary search tree
prettyPrint(tree.root);

tree.insert(10);

prettyPrint(tree.root);

tree.deleteNode(1);

prettyPrint(tree.root);

tree.deleteNode(3);

prettyPrint(tree.root);

tree.deleteNode(5);

prettyPrint(tree.root);
