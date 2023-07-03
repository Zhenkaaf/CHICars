export const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid].id === target) {
      return arr[mid];
    }

    if (arr[mid].id < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;
};
