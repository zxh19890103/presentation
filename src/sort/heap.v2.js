define((require) => {

    const { swap } = require('../util/index')

    let graphdata = null
    let time = 0
    
    const sort = function (originArr) {
        time = performance.now()
        graphdata = []
        const arr = originArr.map(i => i)
        // make max heap
        // 1. swap the first and the last
        // 2. let the last alone, and makeMaxHeap again.
        makeMaxHeap(arr)
        for (let size = arr.length, i = size - 1; i >= 0; i --) {
            swap(arr, i, 0)
            graphdata.push([i, 0])
            heapify(arr, 0, i)
        }
        time = performance.now() - time
    }
    
    /**
     * given 5,4,6,3,1,2
     *           5
     *       4-------6
     *     3---1  2---
     * tranform it to
     * big root heap (the root is greater than any of it's children.)
     *           6
     *       4-------5
     *     3---1  2---
     * @param {*} arr 
     */
    const heapify = function(arr, tree = 0, end = 0) {
        let leftChild = 2 * tree + 1
        let rightChild = leftChild + 1
        if (leftChild >= end) return
        if (rightChild >= end) rightChild = -1
        const biggest = getTheBiggest(arr, tree, leftChild, rightChild)
        if (biggest === tree) return
        swap(arr, biggest, tree)
        graphdata.push([biggest, tree])
        heapify(arr, biggest, end)
    }
    
    const makeMaxHeap = function (arr) {
        const size = arr.length
        const start = Math.floor(size / 2) - 1
        for (let i = start; i >= 0; i--) {
            heapify(arr, i, size - 1)
        }
    }
    
    const getTheBiggest = (arr, x, y, z) => {
        let answer = x
        if (arr[y] && arr[y].val > arr[answer].val) {
            answer = y
        }
        if (arr[z] && arr[z].val > arr[answer].val) {
            answer = z
        }
        return answer
    }

    return {
        sort,
        read: () => {
            return {
                data: graphdata,
                time: time
            }
        },
        title: '堆排序',
        desc: `<pre>
堆数据结构是一种数组对象，它可以被视为一颗完全二叉树结构。
它的特点是父节点的值大于（小于）两个子节点的值（分别称为大顶堆和小顶堆）。
它常用于管理算法执行过程中的信息，应用场景包括堆排序，优先队列等。
下面是其要义。
Init:
    S = Length
    构建大根堆
Loop:
    堆首尾（0，S - 1）互换。
    忽略最后元素，对子序列 R[0, S - 2] 恢复大根堆
    S = S - 1
Util:
    S == 1
</pre>`
    }
})