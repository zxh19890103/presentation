define((require) => {
    /**
     * 3 steps
     * 1.  
     * 2. 
     * 3. 
     */

    const Util = require('../util/index')

    let graphdata = null
    let time = 0
    let sortedArray = null

    const mergeSort = function (arr, i) {
        const L = arr.length
        if (L === 1) {
            return arr
        }
        const middle = Math.floor(L / 2)
        const arr1 = mergeSort(arr.slice(0, middle), i)
        const arr2 = mergeSort(arr.slice(middle, L), middle)
        const arr3 = merge(arr1, arr2, i)
        return arr3
    }

    const merge = function (arr1, arr2, q)  {
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

    const sort = function (originArr) {
        time = performance.now()
        graphdata = []
        sortedArray = mergeSort(originArr, 0)
        time = performance.now() - time
    }

    return {
        sort,
        read: () => {
            return {
                data: graphdata,
                time: time,
                sorted: sortedArray
            }
        }
    }
})