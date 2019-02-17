define((require) => {
    const array = require('../data/arr')
    const desc = require('../data/desc')
    const sortUtil = require('../sort/index')
    const util = require('../util/index')

    const WIDTH = 680
    const HEIGHT = WIDTH / 2 // 340
    const BAR_WIDTH = Math.floor(WIDTH / array.length)

    let canvas = null
    let ctx = null
    let text = null

    let N = 0
    let currentKey = ''
    let stopSignal = false
    let isRunning = false
    let onSortAnimationStopped = null

    const init = () => {
        canvas = document.createElement('canvas')
        canvas.width = WIDTH
        canvas.height = HEIGHT
        canvas.style.border = '1px solid #DDD'
        canvas.style.margin = '12px'
        ctx = canvas.getContext('2d')
        document.body.appendChild(canvas)

        // buttons
        const keys = [
            'bubble', 'insert', 'select'
        ]
        const buttonsWrap = document.createElement('div')
        buttonsWrap.style.margin = '12px'
        keys.forEach(key => {
            const button = createButton(
                desc[key].title.toUpperCase(),
                () => {
                    if (isRunning) {
                        stopSortAnimation(() => {
                            currentKey = key
                            playSortAnimation(key)
                        })
                    } else {
                        currentKey = key
                        playSortAnimation(key)
                    }
                }
            )
            buttonsWrap.appendChild(button)
        })
        document.body.appendChild(buttonsWrap)

        // constrol
        const ctrlsWrap = document.createElement('div')
        ctrlsWrap.style.margin = '12px'
        const disOrderButton = createButton('DisOrder', () => {
            stopSortAnimation(() => {
                util.disOrder(array)
                draw(array)
                if (currentKey) {
                    playSortAnimation(currentKey)
                }
            })
        })
        ctrlsWrap.appendChild(disOrderButton)
        document.body.appendChild(ctrlsWrap)

        // description
        const div = document.createElement('div')
        div.style.width = WIDTH + 'px'
        div.style.margin = '12px'       
        const h4 = document.createElement('h4')
        h4.style.marginBottom = '0px'
        const p = document.createElement('p')
        p.style.marginTop = '0px'
        div.appendChild(h4)
        div.appendChild(p)
        text = {
            div,
            h4,
            p
        }
        document.body.appendChild(div)
    }

    const createButton = (text, onclick) => {
        const button = document.createElement('a')
        button.href = 'javascript: void(0);'
        button.onclick = onclick
        button.innerText = text
        button.style.lineHeight = '18px'
        button.style.marginRight = '8px'
        return button
    }

    const drawElement = (ctx, array, i) => {
        const element = array[i]
        const x = i * BAR_WIDTH
        const y = HEIGHT - element.val
        ctx.fillStyle = element.color
        ctx.fillRect(x, y, BAR_WIDTH, element.val)
    }

    const draw = (array) => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        for (let i = 0; i < array.length; i ++) {
            drawElement(ctx, array, i)
        }
    }

    const wait = (callback) => {
        if (N > 5) {
            N = 0
            callback && callback()
            return 
        }
        N ++
        requestAnimationFrame(() => {
            wait(callback)
        })
    }

    const playSortAnimation = (key) => {
        const sorter = sortUtil[key]
        const sortGen =  sorter.sort(array)
        const { h4, p } = text
        h4.innerText = desc[key].title
        p.innerText = desc[key].desc
        sorter.onSwap((i, j) => {
            if (stopSignal) {
                stopSignal = false
                isRunning = false
                onSortAnimationStopped && onSortAnimationStopped()
                return
            }
            draw(array)
            wait(() => {
                const val = sortGen.next()
                if (val.done) {
                    isRunning = false
                }
            })
        })
        // start
        sortGen.next()
        isRunning = true
    }

    const stopSortAnimation = (callback) => {
        stopSignal = true
        onSortAnimationStopped = () => {
            callback && callback()
            onSortAnimationStopped = null
        }
    }

    init()
    draw(array)
})