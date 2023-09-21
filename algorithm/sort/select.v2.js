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
        },
        title: '选择排序',
        desc: `<pre>
选择排序是比较直观的排序算法。
下面是其要义。
Init:
    N = 0
    S = Length
Loop:
    从 R(N, S) 找到最小的那个元素 M，与 N 互换。
    怎么找？遍历 R[N, S) ，用冒泡法查找
    N = N + 1
Util:
    N == Length
</pre>`
    }
})
