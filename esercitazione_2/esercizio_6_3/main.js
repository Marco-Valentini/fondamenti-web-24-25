function range(a,b){
    let arr = []
    for (let i=a; i<=b; i++) {
        arr.push(i) // aggiunge in coda
        // arr.unshift(i) aggiunge in testa
    }
    return arr
}

function sum(arr){
    let sum = 0
    for (let i=0; i<arr.length; i++){
        sum += arr[i]
    }
    return sum
}
console.log(range(10, 20))
console.log(sum(range(10, 20)))

// TODO provare a fare la stessa cosa usando reduce() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
console.log(range(10, 20).reduce((a, b) => a + b))