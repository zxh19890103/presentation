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
        }
    }
    return util
})