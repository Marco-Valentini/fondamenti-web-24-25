let arr = [1,2,3,4,5,6,7,8,9,10]

let array = [1,2,3,4,5]
console.log(array);

function inverti(arr){
    let temp = []
    for (let i=arr.length-1; i>=0; i--) {
        temp.push(arr[i])
    }
    return temp
}

console.log(inverti(array));


function reverseInPlace(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return arr;
    }
    // Swap elements
    [arr[left], arr[right]] = [arr[right], arr[left]];
    return reverseInPlace(arr, left + 1, right - 1);
}


console.log(reverseInPlace(arr, 0, arr.length-1));