define(() => {
    const util = {
        swap: (arr, i, j) => {
            if (i === j) return
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        },
        max: (arr) => {
            let answer = 0
            for (let i = 0, size = arr.length; i< size; i ++) {
                if (arr[i] > arr[answer]) {
                    answer = i
                }
            }
            return answer
        },
        disOrder: (arr, swapLimit = 100) => {
            let j = -1
            let k = -1
            for (let i = 0; i < swapLimit; i ++) {
                j = Math.floor(Math.random() * arr.length)
                k = Math.floor(Math.random() * arr.length)
                util.swap(arr, k, j)
            }
        },
        compare: (arr, i, j) => {
            const a = arr[i].val
            const b = arr[j].val
            if (a === b) return 0
            else if (a > b) return 1
            else return -1
        },
        gt: (a, b) => {
            if (b === undefined) return true
            else if (a === undefined) return false
            return a.val > b.val
        },
        lt: (a, b) => {
            return a.val < b.val
        },
        veq: (a, n) => {
            return a.val === n
        },
        vgt: (a, n) => {
            return a.val > n
        },
        vlt: (a, n) => {
            return a.val < n
        }
    }
    return util
})