define((require) => {
    const { swap } = require('../util/index')
    /**
     * 1. set the pivot = 3
     * 2. left = [7, 2]; right = [9, 4];
     * 3. do left: set pivot = 7, and left = [2]; right = []; return [2, 7]; end
     * 4. do right: set pivot = 9, and left = [4]; right = []; return [4, 9]; end
     * 5. 
     */

    let graphdata = null
    let time = 0

    /**
     * partialSort
     * @param {*} arr the array you want sort
     * @param {*} start include
     * @param {*} end include
     */
    const partialSort = function (arr, start, end) {
        if (end - start < 1) {
            return
        }
        let pivot = start
        const pivotValue = arr[pivot]
        let i = start + 1
        while (i <= end) {
            if (arr[i].val < pivotValue.val) {
                swap(arr, i, pivot + 1)
                graphdata.push([i, pivot + 1])
                swap(arr, pivot, pivot + 1)
                graphdata.push([pivot, pivot + 1])
                pivot ++
            }
            i ++
        }
        partialSort(arr, start, pivot - 1)
        // exclude the pivot
        partialSort(arr, pivot + 1, end)
    }
    
    const sort = function (originArr) {
        time = performance.now()
        const arr = originArr.map(i => i)
        graphdata = []
        partialSort(arr, 0, arr.length - 1)
        time = performance.now() - time
    }

    return {
        sort,
        read: () => {
            return {
                data: graphdata,
                time: time
            }
        }
    }
})
