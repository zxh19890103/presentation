define((require) => {
    const { veq, vgt, vlt } = require('../util/index')

    let graphdata = null
    let time = 0

    const search = (array, target) => {
        time = performance.now()
        graphdata = []
        let min = 0
        let max = array.length - 1 // excludes
        let mid = -1
        let item = null
        do {
            mid = min + Math.ceil((max - min) / 2)
            item = array[mid]
            let diff = item.val - target
            if (diff === 0) return mid
            else if (diff > 0) {
                max = mid - 1
            } else {
                min = mid + 1
            }
            graphdata.push(mid)
        } while (min <= max)
        time = performance.now() - time
        return -1
    }

    return {
        search,
        read: () => {
            return {
                data: graphdata,
                time: time
            }
        }
    }
})