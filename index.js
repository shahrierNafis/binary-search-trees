// Function to create a new node in the tree
function createNode(data) {
  return {
    data: data,
    left: null,
    right: null,
  };
}

/**
 * Function to create a binary search tree from an array of numbers
 * @param {Array} array - The input array of numbers
 * @returns {Object} - The root node of the binary search tree
 */
function createTree(array) {
  // Remove duplicates and sort the array in ascending order
  array = Array.from(
    new Set(
      array.sort(function (a, b) {
        return a - b;
      })
    )
  );

  let start = 0;
  let end = array.length - 1;
  return {
    root: buildTree(array, start, end),
  };
}

/**
 * Recursive function to build a binary search tree from a sorted array
 * @param {Array} array - The sorted array of numbers
 * @param {number} start - The starting index of the current subarray
 * @param {number} end - The ending index of the current subarray
 * @returns {Object} - The root node of the binary search tree
 */
function buildTree(array, start, end) {
  // Base case: start index is greater than end index
  if (start > end) {
    return null;
  }

  let mid = parseInt((start + end) / 2);
  let root = createNode(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

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

// Create a binary search tree from the given array
let tree = createTree([1, 2, 5, 6, 7, 7, 6, 6, 4, 5, 9, 565, 3, 8, 4]).root;

// Print the binary search tree
prettyPrint(tree);
