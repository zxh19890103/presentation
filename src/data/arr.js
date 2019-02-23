define(() => {
    const array = new Array(26).fill(0).map(i => {
        return Math.floor(Math.random() * 300)
    })
    const arrayColors = array.map(i => {
        return '#' + Math.random().toString(16).substr(2,6)
    })
    return array.map((element, i) => {
        return {
            val: element,
            color: arrayColors[i]
        }
    })
})