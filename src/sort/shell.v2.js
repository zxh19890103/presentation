define(require => {
    const Util = require('../util/index')

    let graphdata = null
    let time = 0

    let SIZE = 0

    const group = function (arr, gap) {
        // gap times.
        for (let i = 0; i < gap; i ++) {
            insertionSort(arr, gap, i)
        }
    }

    const insertionSort = function (arr, gap, offset) {
        let i = offset
        while (i < SIZE) {
            let j = offset
            while (j < i) {
                if (Util.gt(arr[j], arr[i])) {
                    Util.swap(arr, i, j)
                    graphdata.push([i, j])
                }
                j += gap
            }
            i += gap
        }
    }

    const sort = function (originArr) {
        time = performance.now()
        const arr = originArr.map(i => i)
        graphdata = []
        SIZE = arr.length
        let gap = Math.floor(SIZE / 2)
        while (true) {
            group(arr, gap)
            gap = Math.floor(gap / 2)
            if (gap === 0) {
                break
            }
        }
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