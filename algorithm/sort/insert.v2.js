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
        },
        title: '插入排序',
        desc: `<pre>
插入排序是比较直观的排序算法。
下面是其要义。
Init:
    N = 0
Loop:
    将第 N + 1 个元素插入到子序列 R[0, N] 合适的位置，以确保子序列 R[0, N + 1] 是递增的！
    如何确保递增？ 遍历 R[0, N]，遇到第一个比 R(N + 1) 大的元素 M，放到 M 之前。
    N = N + 1
Util:
    N == Length
</pre>`
    }
})