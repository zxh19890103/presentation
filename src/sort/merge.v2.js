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

    const mergeSort = function (arr) {
        const L = arr.length
        if (L === 1) {
            return arr
        }
        const middle = Math.floor(L / 2)
        const arr1 = mergeSort(arr.slice(0, middle))
        const arr2 = mergeSort(arr.slice(middle, L))
        const arr3 = merge(arr1, arr2)
        return arr3
    }

    const merge = function (arr1, arr2)  {
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
        sortedArray = mergeSort(originArr)
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
        title: '归并排序',
        desc: `<pre>
归并排序是一种分治思维的体现，
下面是其要义。
Init:
    S = Length
    Sub: Merge**
        Inputs: Arr0, Arr1
        Do:
            合并 Arr0 与 Arr1 得到 Arr2，使得 Arr2 是个顺序序列
        Return: Arr2
    **
    Sub: Sort**
        Inputs: Arr,
        Init:
            S = Length - 1
            M = [S / 2]
            Arr0 = R[0, M]
            Arr1 = R(M, S]
            Arr2
        Do:
           Arr3 = 执行 Sort(Arr0)
           Arr4 = 执行 Sort(Arr1)
           Arr2 = 执行 Merge(Arr3, Arr4)
        Re:
            Arr2
    **
Re:
    执行 Sort(R[0, S))
</pre>`
    }
})