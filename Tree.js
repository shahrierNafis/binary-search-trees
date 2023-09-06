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
      // find the successor
      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }
      // delete the successor
      deleteNode(successor.data);
      // replace the node's data with the successor's data
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
  function levelOrder(func = (data) => data) {
    let array = [];
    let queue = [];
    if (!root) return;
    queue.push(root);
    //while at least one discovered node
    while (queue[0]) {
      let current = queue[0];
      array.push(func(current.data));
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
    }
    return array;
  }
  /**
   * Returns an array with the data of all nodes in the tree using pre-order traversal.
   * @param {function} [func=(data) => data] - Optional function to apply to each node's data.
   * @returns {Array} - Array containing the data of all nodes in the tree.
   */
  function preOrder(func = (data) => data) {
    let array = [];

    /**
     * Helper function that performs pre-order traversal of the tree.
     * @param {TreeNode} node - The current node being visited.
     */
    let recursion = (node) => {
      if (node == null) return;
      array.push(func(node.data));
      recursion(node.left);
      recursion(node.right);
    };

    recursion(root);
    return array;
  }
  /**
   * Returns an array of node data in in-order traversal order.
   * @param {function} func - Optional function to transform node data.
   * @returns {Array} - Array of node data.
   */
  function inOrder(func = (data) => data) {
    // Initialize an empty array to store node data
    let array = [];

    // Recursive function to traverse the tree in in-order order
    let recursion = (node) => {
      // Base case: if the node is null, return
      if (node == null) return;

      // Traverse left subtree
      recursion(node.left);

      // Add transformed node data to the array
      array.push(func(node.data));

      // Traverse right subtree
      recursion(node.right);
    };

    // Start the recursive traversal from the root node
    recursion(root);

    // Return the array of node data
    return array;
  }
  /**
   * Returns an array containing the post-order traversal of a binary tree.
   *
   * @param {function} func - A function to be applied to each node's data. Default is an identity function.
   * @returns {array} - An array containing the post-order traversal of the binary tree.
   */
  function postOrder(func = (data) => data) {
    // Initialize an empty array to store the post-order traversal
    let array = [];

    // Recursive function to traverse the binary tree in post-order
    let recursion = (node) => {
      // Base case: If the node is null, return
      if (node == null) return;

      // Recursively traverse the left subtree
      recursion(node.left);

      // Recursively traverse the right subtree
      recursion(node.right);

      // Apply the provided function to the node's data and push it to the array
      array.push(func(node.data));
    };

    // Start the recursion from the root node
    recursion(root);

    // Return the array containing the post-order traversal
    return array;
  }
  /**
   * Calculates the height of a binary tree.
   * @param {Object} node - The root node of the binary tree.
   * @param {number} h - The current height of the node (optional, default is 1).
   * @returns {number} - The height of the binary tree.
   */
  function height(node, h = 1) {
    let leftHeight;
    let rightHeight;

    // If the node doesn't exist, height is 0
    if (!node) {
      return 0;
    }

    // If the node is a leaf, height is 1
    if (!(node.left || node.right)) {
      return 1;
    }

    // Get the height of the left child
    if (node.left) {
      leftHeight = h + height(node.left);
    }

    // Get the height of the right child
    if (node.right) {
      rightHeight = h + height(node.right);
    }

    // The longest path counts as the height
    h = leftHeight > rightHeight ? leftHeight : rightHeight;

    return h;
  }
  return {
    get root() {
      return root;
    },
    insert,
    deleteNode,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
  };
}
export default { create };
