define((require) => {
    const { swap } = require('../util/index')
    let graphdata = null
    let time = 0

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
    
    const sort = function (originArr) {
        time = performance.now()
        const arr = originArr.map(i => i)
        graphdata = []
        const len = arr.length
        let i = 0
        const lastIndex = len - 1
        while (i < lastIndex) {
            const smallest = findTheSmallest(arr, i, lastIndex)
            swap(arr, i, smallest)
            graphdata.push([i, smallest])
            i ++
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
