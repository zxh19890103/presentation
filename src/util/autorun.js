define((require) => {

    function* togen(arr) {
        let i = arr.length
        let j = 0
        while (i --) {
            yield arr[j]
            j ++
        }
    }

    const autorun = function (arr) {
        let ticks = 5
        let lastValue = null
        let _do = null
        let _end = null
        let tick = 0

        const g = togen(arr)

        const wait = () => {
            tick += 1
            if (tick > ticks) {
                tick = 0
                next()
            } else {
                requestAnimationFrame(wait)
            }
        }

        const next = () => {
            const { value, done } = g.next()
            if (done) {
                _end()
            } else {
                _do(lastValue, value)
                lastValue = value
                wait()               
            }
        }

        return {
            per(t) {
                ticks = t
                return this
            },
            do(func) {
                _do = func
                return this
            },
            end(func) {
                _end = func
                return this
            },
            run() {
                next()
            }
        }
    }
    return autorun
})