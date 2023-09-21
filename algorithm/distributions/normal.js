/// <reference path="d3.min.js" />
/**
 * y = ƒ(x)
 * 
 */

// const svg = d3.select(document.body).append('svg')

// const path = d3.path()
// path.rect(0, 0, 100, 50)
// svg.append(d3.create('path').data(path.toString()))


const generateRand = (n) => {
    return new Array(n).fill(0).map(i => {
        return Math.floor(Math.random() * 100)
    })
}

const numbers = new Array(49).fill(0).map(i => {
    const subnumbers = generateRand(100)
    return subnumbers
}).reduce((p, n) => {
    let newnumbers = []
    let i = 100
    while (i --) {
        newnumbers.push(p[i] + n[i])
    }
    return newnumbers
}, generateRand(100)).map(i => Math.floor(i / 50))

console.log(numbers)