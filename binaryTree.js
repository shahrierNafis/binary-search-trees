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
    // Find the node where the data should be inserted.
    let node = find(data);

    // If the data already exists in the tree, return.
    if (node.data) {
      return;
    }

    // If the data is less than the parent node, insert it on the left.
    else if (node.parentNode.data > data) {
      node.parentNode.left = Node.create(data);
    }

    // If the data is greater than the parent node, insert it on the right.
    else if (node.data < data) {
      node.parentNode.right = Node.create(data);
    }
  }

  /**
   * Deletes a node from a binary tree.
   *
   * @param {number} data - The value of the node to be deleted.
   */
  function deleteNode(data) {
    // find the node and its parent
    let node = find(data);

    // if the node is a leaf
    if (!node.left && !node.right) {
      if (node.parentNode.left === node) {
        node.parentNode.left = null; // if the node is left to its parent
      } else {
        parentNode.right = null;
      }
    }
    // if the node only has a left child
    else if (node.left && !node.right) {
      if (node.parentNode.data > node.left.data) {
        node.parentNode.left = node.left;
      } else {
        node.parentNode.right = node.left;
      }
    }
    // if the node only has a right child
    else if (!node.left && node.right) {
      if (node.parentNode.data > node.right.data) {
        node.parentNode.left = node.right;
      } else {
        node.DOCUMENT_TYPE_NODEparentNode.right = node.right;
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
   * @returns {Node} - the found node. If the node is not found, the last visited node is returned.
   */
  function find(data) {
    // Start at the root node
    let node = root;
    let parentNode = null;

    while (node) {
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
    node = node ? node : {};
    node.parentNode = parentNode;
    return node;
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

    // Start the recursive traversal from the root node
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

    /**
     * Helper function that performs pre-order traversal of the tree.
     * @param {TreeNode} node - The current node being visited.
     */
    let recursion = (node) => {
      if (node == null) return;
      recursion(node.left);
      array.push(func(node.data));
      recursion(node.right);
    };

    // Start the recursive traversal from the root node
    recursion(root);

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

    /**
     * Helper function that performs pre-order traversal of the tree.
     * @param {TreeNode} node - The current node being visited.
     */
    let recursion = (node) => {
      if (node == null) return;
      recursion(node.left);
      recursion(node.right);
      // Apply the provided function to the node's data and push it to the array
      array.push(func(node.data));
    };

    // Start the recursion from the root node
    recursion(root);

    return array;
  }
  /**
   * Calculate the depth of a node in a tree.
   * @param {Node} node - The node to calculate the depth for.
   * @param {number} [d=1] - The current depth of the node.
   * @returns {number} - The depth of the node.
   */
  function depth(node, d = 1) {
    // If the node has no parent, it is at the root and has a depth of 1
    if (!node.parentNode) {
      return 1;
    }

    // Recursively calculate the depth of the parent node and add it to the current depth
    d += depth(find(node.parentNode.data));

    // Return the final depth
    return d;
  }
  /**
   * Rebalances the binary tree.
   */
  function rebalance() {
    // Check if the tree is already balanced
    if (isBalanced(root)) {
      return;
    }

    // Create a new balanced tree
    const newTree = create(preOrder());

    // Replace the current tree with the new tree
    Object.assign(root, newTree.root);
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
    depth,
    isBalanced,
    rebalance,
  };
}
/**
 * Calculates the height of a binary tree.
 * @param {Object} node - The root node of the binary tree.
 * @param {number} h - The current height of the node (optional, default is 1).
 * @returns {number} - The height of the binary tree.
 */
function height(node, h = 1) {
  let leftHeight = 0;
  let rightHeight = 0;

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
/**
 * Check if a binary tree is balanced.
 *
 * @param {Node} node - The root node of the binary tree.
 * @returns {boolean} - True if the binary tree is balanced, false otherwise.
 */
function isBalanced(node) {
  // Base case: if node is null, it is considered balanced.
  if (!node) {
    return true;
  }

  // Calculate the height of the left and right subtrees.
  let leftHeight = height(node.left);
  let rightHeight = height(node.right);

  // Calculate the difference in height between the left and right subtrees.
  let difference = Math.abs(leftHeight - rightHeight);

  // If the height difference is less than or equal to 1,
  // check if the node only has leaf children.
  if (difference <= 1) {
    if (leftHeight + rightHeight <= 1) {
      // Base case: if the node only had leaf children, it is considered balanced.
      return true;
    }
    // Recursion case: check if the children nodes are balanced.
    return isBalanced(node.left) && isBalanced(node.left);
  }

  // Height difference is more than 1, so the tree is not balanced.
  return false;
}
export default { create, isBalanced, height };
