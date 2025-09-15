let arr=[2,3,4,5,6,7,8,9,10,11,12,13,14,15];

arr.find((item, index) => {
    if (item % 2 === 0) {
        console.log(`Even number found: ${item} at index ${index}`);
        return true; // Stops the search after finding the first even number
    }
    return false; // Continue searching for an even number
});

arr.filter((item, index) => {
    if (item % 2 === 0) {
        console.log(`Even number: ${item} at index ${index}`);
        return true; // Keeps the even number in the filtered array
    }
    return false; // Excludes odd numbers from the filtered array
});