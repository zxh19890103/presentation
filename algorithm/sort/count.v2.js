define((require) => {
    const { swap } = require('../util/index')

    let graphdata = []
    let time = 0
    let sortedArray = null

    const sort = (originArr) => {
        time = performance.now()
        graphdata = []
        const arr = originArr.map(i => i)
        const arrNumbers = arr.map(i => i.val)
        const min = Math.min(...arrNumbers)
        const max = Math.max(...arrNumbers)
        const arrCounts = new Array(max - min + 1).fill(0).map(i => {
            return {
                c: 0,
                values: []
            }
        })
        arr.forEach(c => {
            let idx = c.val - min
            arrCounts[idx].c += 1
            arrCounts[idx].values.push(c)
        })
        sortedArray = []
        for (let i = 0, l = arrCounts.length; i < l; i ++) {
            if (arrCounts[i].c === 0) continue
            sortedArray.push(...arrCounts[i].values)
        }
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
        },
    }
})