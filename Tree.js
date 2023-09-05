import Node from "./Node.js";

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
  let root = Node.create(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

/**
 * Function to create a binary search tree from an array of numbers
 * @param {Array} array - The input array of numbers
 * @returns {Object} - The root node of the binary search tree
 */
function create(array) {
  // Remove duplicates and sort the array in ascending order
  array = Array.from(
    new Set(
      array.sort(function (a, b) {
        return a - b;
      })
    )
  );

  const start = 0;
  const end = array.length - 1;
  const root = buildTree(array, start, end);

  /**
   * Inserts a node with the given data into the binary tree.
   * @param {number} data - The data to be inserted.
   */
  function insert(data) {
    // find the leaf node set it
    find(data).node.data = data;
  }

  /**
   * Deletes a node from a binary tree.
   *
   * @param {number} data - The value of the node to be deleted.
   */
  function deleteNode(data) {
    // find the node and its parent
    let { node, parentNode } = find(data);

    // if the node is a leaf
    if (!node.left && !node.right) {
      if (parentNode.left === node) {
        parentNode.left = null; // if the node is left to its parent
      } else {
        parentNode.right = null;
      }
    }
    // if the node only has a left child
    else if (node.left && !node.right) {
      if (parentNode.data > node.left.data) {
        parentNode.left = node.left;
      } else {
        parentNode.right = node.left;
      }
    }
    // if the node only has a right child
    else if (!node.left && node.right) {
      if (parentNode.data > node.right.data) {
        parentNode.left = node.right;
      } else {
        parentNode.right = node.right;
      }
    }
    // if the node has two children
    else {
      // find the inorder successor
      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }
      // delete the inorder successor
      deleteNode(successor.data);
      // replace the node's data with the inorder successor's data
      node.data = successor.data;
    }
  }
  /**
   * Finds a node in the tree with the specified data.
   * @param {number} data - The data to search for.
   * @returns {Object} - An object containing the found node and its parent node.
   *                    If the node is not found, the last visited node is returned.
   */
  function find(data) {
    // Start at the root node
    let node = root;
    let parentNode = null;

    // Traverse the tree until reaching a leaf node
    while (node.left || node.right) {
      // If the current node's data is greater than the search data, go to the left child node
      if (node.data > data) {
        parentNode = node;
        node = node.left;
      }
      // If the current node's data is less than the search data, go to the right child node
      else if (node.data < data) {
        parentNode = node;
        node = node.right;
      }
      // If the current node's data is equal to the search data, return the current node
      else {
        break;
      }
    }

    return { node, parentNode };
  }
  return {
    get root() {
      return root;
    },
    insert,
    deleteNode,
  };
}
export default { create };
