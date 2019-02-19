define((require) => {
    const { swap } = require('../util/index')
    /**
     * 1. set the pivot = 3
     * 2. left = [7, 2]; right = [9, 4];
     * 3. do left: set pivot = 7, and left = [2]; right = []; return [2, 7]; end
     * 4. do right: set pivot = 9, and left = [4]; right = []; return [4, 9]; end
     * 5. 
     */

    let onSwap = null
    let onDeep = null

    /**
     * partialSort
     * @param {*} arr the array you want sort
     * @param {*} start include
     * @param {*} end include
     */
    const partialSort = function* (arr, start, end) {
        if (end - start < 1) {
            return
        }
        let pivot = start
        const pivotValue = arr[pivot]
        let i = start + 1
        while (i <= end) {
            if (arr[i].val < pivotValue.val) {
                swap(arr, i, pivot + 1)
                onSwap && onSwap()
                yield
                swap(arr, pivot, pivot + 1)
                onSwap && onSwap()
                pivot ++
                yield
            }
            i ++
        }
        const gLeft = partialSort(arr, start, pivot - 1)
        onDeep && onDeep(gLeft)
        yield
        // exclude the pivot
        const gRight = partialSort(arr, pivot + 1, end)
        onDeep && onDeep(gRight)
        yield
    }
    
    const sort = function* (arr) {
        const g = partialSort(arr, 0, arr.length - 1)
        onDeep && onDeep(g)
        yield
    }

    const pickPivot = (start, end) => {
        const diff = end - start
        return Math.ceil(Math.random() * diff) + start
    }

    const findPivot = (arr, value, start, end) => {
        let i = start
        while (i <= end) {
            if (arr[i].val === value) {
                return i
            }
            i ++
        }
        return -1
    }

    return {
        sort,
        onSwap: (func) => {
            onSwap = func
        },
        onDeep: (func) => {
            onDeep = func
        }
    }
})
