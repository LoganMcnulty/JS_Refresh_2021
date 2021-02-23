var one = 0
var two = 0
var zero = 0
var trials = 1000
results = {

}


for (i=0; i < trials; i++){
    x = Math.round(Math.random() * 9)
    results[x] = x
}

console.log(results)
// console.log(one/trials, two/trials, zero/trials)