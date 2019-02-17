define((require) => {
    /**
     * 1. set the pivot = 3
     * 2. left = [7, 2]; right = [9, 4];
     * 3. do left: set pivot = 7, and left = [2]; right = []; return [2, 7]; end
     * 4. do right: set pivot = 9, and left = [4]; right = []; return [4, 9]; end
     * 5. 
     */
    let N = 0
    
    const sort = (arr) => {
        const L = arr.length
        if (L < 2) {
            return arr
        }
        const middle = 0
        const pivot = arr[middle]
        const arr_left = []
        const arr_right = []
        let item = null
        for (let i in arr) {
            if (i === middle) {
                continue
            }
            item = arr[i]
            if (item <= pivot) {
                arr_left.push(item)
            } else {
                arr_right.push(item)
            }
        }
        N ++
        if (N > 10) return []
        const arr_left_sort = sort(arr_left)
        const arr_right_sort = sort(arr_right)
        return arr_left_sort.concat(pivot).concat(arr_right_sort)
    }

    return {
        sort
    }
})
