define((require) => {
    const { swap } = require('../util/index')
    let graphdata = null
    let time = 0
    
    const sort = function (originArr) {
        time = performance.now()
        graphdata = []
        const arr = originArr.map(i => i)
        // handle the Nth element
        let value = null
        for (let i = 1, max = arr.length; i < max; i ++) {
            value = arr[i].val
            for (let j = 0; j < i; j ++) {
                if (value < arr[j].val) {
                    swap(arr, i, j)
                    graphdata.push([i, j])
                }
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