define((require) => {
    const { swap } = require('../util/index')
    let onSwap = null

    const findTheSmallest = (arr, from, stop) => {
        let index = from
        let tmp = arr[index]
        let i = from + 1
        while (i <= stop) {
            if (tmp.val > arr[i].val) {
                tmp = arr[i]
                index = i
            }
            i ++
        }
        return index
    }
    
    const sort = function* (arr) {
        const len = arr.length
        let i = 0
        const lastIndex = len - 1
        while (i < lastIndex) {
            const smallest = findTheSmallest(arr, i, lastIndex)
            swap(arr, i, smallest)
            onSwap && onSwap()
            i ++
            yield
        }
    }

    return {
        sort,
        onSwap: (func) => {
            onSwap = func
        }
    }
})
