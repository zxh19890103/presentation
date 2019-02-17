define((require) => {
    const { swap } = require('../util/index')
    let onSwap = null
    
    const sort = function* (arr) {
        // handle the Nth element
        for (let i = 1, max = arr.length; i < max; i ++) {
            const element = arr[i]
            for (let j = 0; j < i; j ++) {
                if (element.val < arr[j].val) {
                    swap(arr, i, j)
                    onSwap && onSwap()
                    yield
                }
            }
        }
    }

    return {
        sort,
        onSwap: (func) => {
            onSwap = func
        }
    }
})