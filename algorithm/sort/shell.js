define(require => {
    const Util = require('../util/index')

    let onSwap = null
    let onDeep = null

    let SIZE = 0

    const group = function* (arr, gap) {
        // gap times.
        for (let i = 0; i < gap; i ++) {
            const g = insertionSort(arr, gap, i)
            onDeep(g)
            yield
        }
    }

    const insertionSort = function* (arr, gap, offset) {
        let i = offset
        while (i < SIZE) {
            let j = offset
            while (j < i) {
                if (Util.gt(arr[j], arr[i])) {
                    Util.swap(arr, i, j)
                    onSwap && onSwap()
                    yield
                }
                j += gap
            }
            i += gap
        }
    }

    const sort = function* (arr) {
        SIZE = arr.length
        let gap = Math.floor(SIZE / 2)
        let g = null
        while (true) {
            g = group(arr, gap)
            onDeep(g)
            yield
            gap = Math.floor(gap / 2)
            if (gap === 0) {
                break
            }
        }
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