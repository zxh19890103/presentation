define((require) => {
    const { veq } = require('../util/index')

    let graphdata = null
    let time = 0

    const search = (array, target) => {
        time = performance.now()
        graphdata = []
        for (let i = 0, l = array.length; i < l; i ++) {
            graphdata.push(i)
            if (veq(array[i], target)) {
                return i
            }
        }
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