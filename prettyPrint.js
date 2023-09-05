/**
 * Function to pretty print the binary search tree
 * @param {Object} node - The current node being printed
 * @param {string} prefix - The prefix to be added before each node
 * @param {boolean} isLeft - Indicates if the node is the left child of its parent
 */
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
export { prettyPrint };
