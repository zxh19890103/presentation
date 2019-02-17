define((require) => {
    const { swap } = require('../util/index')
    let onSwap = null
    /**
     * Bubble sort
     * set size = MAX
     * #1 do compare A[i] and A[i+1], if A[i] > A[i+1], then swap i and i + 1, til the i = size - 1.
     * now the last one is the max number.
     * set size = MAX - 1
     * do #1
     * ...
     * while the size = 1
     * sorting ends.
     */
    const sort = function* (arr) {
        let a = null
        let b = null
        let max = arr.length - 1
        for (let k = max; k > 1; k --) {
            for (let i = 0; i < k; i ++) {
                a = arr[i]
                b = arr[i + 1]
                if (a.val > b.val) {
                    swap(arr, i, i + 1)
                    onSwap && onSwap(i, i + 1)
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
