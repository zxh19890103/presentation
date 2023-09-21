define((require) => {
    /**
     * 3 steps
     * 1.  
     * 2. 
     * 3. 
     */

    const { lt, gt, swap } = require('../util/index')

    let graphdata = null
    let time = 0
    let sortedArray = null

    let _arr = null

    // const mergeSort = function (arr) {
    const mergeSort = function (start, end) {
        // [start, end)
        // const L = arr.length
        // if (L === 1) {
        //     return arr
        // }
        if (end - start < 2) return
        const middle = start + Math.floor((end - start) / 2)
        // const arr1 = mergeSort(arr.slice(0, middle))
        // const arr2 = mergeSort(arr.slice(middle, L))
        // const arr3 = merge(arr1, arr2)
        mergeSort(start, middle)
        mergeSort(middle, end)
        merge(start, middle, end)
        //         return arr3
    }

    const merge_d = function (start, middle, end) {
        // keep in mind: R[start, middle) and R[middle, end) is in right order.
        let k = start
        let j = middle
        let max = 1000 // +∞
        while (k < end) {
            max = _arr[k]
            let p = j
            while (p < end) {
                if (lt(_arr[p], max)) {
                    let m = p
                    while (m > k) {
                        swap(_arr, m, m - 1)
                        graphdata.push([m, m -1])
                        m --
                    }
                    p ++
                    k += 1
                } else {
                    j = p
                    break
                }
            }
            // put R[j, p) into R[k, k + 1)
            k ++
        }
    }

    const merge = function (start, middle, end)  {
        const newArray = new Array(end - start)
        let i = start, j = middle, k = 0
        while (i < middle || j < end) {
            let r = false
            if (i === middle) r = true
            else if (j === end) r = false
            else r = gt(_arr[i], _arr[j])
            if (r) {
                newArray[k] = _arr[j]
                j ++
            } else {
                newArray[k] = _arr[i]
                i ++
            }
            k ++
        }
        newArray.forEach((v, i) => {
            _arr[start + i] = v
        })
        graphdata.push({ partial: newArray, offset: start })
    }

    const sort = function (originArr) {
        time = performance.now()
        graphdata = []
        _arr = originArr.map(i => i)
        mergeSort(0, _arr.length)
        time = performance.now() - time
    }

    return {
        sort,
        read: () => {
            return {
                data: graphdata,
                time: time,
                // sorted: sortedArray
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