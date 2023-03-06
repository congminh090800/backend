/**
 * APPROACH: The left out number is the key to this quizz,
 * if we want the smallest sum we just need to leave out the biggest number and vice versa
 */

/**
 * Complexity: O(n),  Memory: O(1)
 */

/**
 *
 * @param {integer[]} arr
 * @returns string
 */
function findMinAndMaxSum(arr) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let sum = 0;

  arr.forEach((item) => {
    if (item > max) {
      max = item;
    }

    if (item < min) {
      min = item;
    }
    sum += item;
  });

  return `${sum - max} ${sum - min}`;
}

module.exports = { findMinAndMaxSum };
