define((require) => {

    const Util = require('../util/index')

    let onSwap = null
    let onDeep = null

    const merge = function* (arr, from, end) {
        // one from ~ middle
        // two middle + 1 ~ end
        if (from === end) return
        if (end - from === 1) {
            if (Util.compare(arr, from, end) === 1) {
                Util.swap(arr, from, end)
                onSwap && onSwap()
                yield
            }
            return
        }
        const middle = Math.floor((from + end) / 2)
        const g0 = merge(arr, from, middle)
        onDeep && onDeep(g0)
        yield
        const g1= merge(arr, middle + 1, end)
        onDeep && onDeep(g1)
        yield
    }

    const sort = function* (arr) {
        const L = arr.length
        const g = merge(arr, 0, L -1)
        onDeep && onDeep(g)
        yield
    }

    return {
        sort,
        onSwap: (func) => {
            onSwap = func
        },
        onDeep: (func) => {
            onDeep = func
        },
        getOutput: () => {
        }
    }
})