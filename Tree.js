import Node from "./Node.js";
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
  let root = Node.create(array[mid]);
  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}
export default { create };
