define((require) => {
    /**
     * 3 steps
     * 1.  
     * 2. 
     * 3. 
     */

    const Util = require('../util/index')

    let onSwap = null
    let onDeep = null

    const mergeSort = function* (arr, i) {
        const L = arr.length
        if (L === 1) {
            onSwap(arr)
            yield
            return arr
        }
        const middle = Math.floor(L / 2)
        const g1 = mergeSort(arr.slice(0, middle), i)
        onDeep(g1)
        // arr1 is the return value of g1
        yield
        const g2 = mergeSort(arr.slice(middle, L), middle)
        onDeep(g2)
        // arr2 is the return value of g1
        yield
        const arr3 = merge(g1.$return, g2.$return)
        onSwap(arr3)
        yield
        return arr3
    }

    const merge = function (arr1, arr2)  {
        const size1 = arr1.length
        const size2 = arr2.length
        const newArray = new Array(size1 + size2)
        let i = 0, j = 0, k = 0
        while (i < size1 || j < size2) {
            const r = Util.gt(arr1[i], arr2[j])
            if (r) {
                newArray[k] = arr2[j]
                j ++
            } else {
                newArray[k] = arr1[i]
                i ++
            }
            k ++
        }
        return newArray
    }

    const sort = function* (arr) {
        const g = mergeSort(arr, 0)
        onDeep(g)
        yield
        return g.$return
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