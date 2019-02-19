define((require) => {
    const array = require('../data/arr')
    const explains = require('../data/explains')
    const sortUtil = require('../sort/index')
    const util = require('../util/index')

    const WIDTH = 680
    const HEIGHT = WIDTH / 2 // 340
    const BAR_WIDTH = WIDTH / array.length

    let canvas = null
    let ctx = null
    let text = null

    let N = 0
    let currentKey = ''
    let stopSignal = false
    let isRunning = false
    let onSortAnimationStopped = null
    let sortKeys = [
        'bubble', 'insert', 'select', 'heap', 'quick'
    ]

    const init = () => {
        const ratio = window.devicePixelRatio
        canvas = document.createElement('canvas')
        canvas.width = Math.floor(WIDTH * ratio)
        canvas.height = Math.floor(HEIGHT * ratio)
        canvas.style.border = '1px solid #DDD'
        canvas.style.margin = '12px'
        canvas.style.width = WIDTH + 'px'
        canvas.style.height = HEIGHT + 'px'
        ctx = canvas.getContext('2d')
        ctx.scale(ratio, ratio)
        document.body.appendChild(canvas)

        // buttons
        const buttonsWrap = document.createElement('div')
        buttonsWrap.style.margin = '12px'
        sortKeys.forEach(key => {
            const button = createButton(
                explains[key].title.toUpperCase(),
                () => {
                    stopSortAnimation(() => {
                        currentKey = key
                        playSortAnimation(key)
                    })
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
        const stopButton = createButton('Stop', () => {
            stopSortAnimation()
        })
        const resumeButton = createButton('Resume', () => {
            startSortAnimation()
        })
        ctrlsWrap.appendChild(disOrderButton)
        ctrlsWrap.appendChild(stopButton)
        ctrlsWrap.appendChild(resumeButton)
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
        if (N > 1) {
            N = 0
            callback && callback()
            return 
        }
        N ++
        requestAnimationFrame(() => {
            wait(callback)
        })
    }

    const sortGenManager = {
        stack: [],
        size: 0,
        pop() {
            this.size --
            this.stack.pop()
        },
        pick() {
            // console.log(this.size)
            return this.stack[this.size - 1]
        },
        push(gen) {
            this.size ++
            this.stack.push(gen)
        },
        next() {
            const first = this.pick()
            const { done } = first.next()
            if (done) {
                this.pop()
                if (this.size === 0) {
                    isRunning = false
                    alert('Over')
                } else {
                    this.next()
                }
            } else {
            }
        }
    }

    /**
     * 
     * @param {*} key 
     */
    const playSortAnimation = (key) => {
        const sorter = sortUtil[key]
        const gen = sorter.sort(array)
        sortGenManager.push(gen)
        const { h4, p } = text
        const { title, desc } = explains[key]
        h4.innerText = title
        p.innerText = desc
        sorter.onSwap((i, j) => {
            if (stopSignal) {
                stopSignal = false
                isRunning = false
                onSortAnimationStopped && onSortAnimationStopped()
                return
            }
            draw(array)
            wait(() => {
                sortGenManager.next()
            })
        })
        if (sorter.onDeep) {
            sorter.onDeep((gen) => {
                wait(() => {
                    // value is a new generator
                    sortGenManager.push(gen)
                    // start
                    sortGenManager.next()
                })
            })
        }
        startSortAnimation()
    }

    const startSortAnimation = () => {
        // start
        if (isRunning) return
        sortGenManager.next()
        isRunning = true
    }

    const stopSortAnimation = (callback) => {
        if (isRunning) {
            stopSignal = true
            onSortAnimationStopped = () => {
                callback && callback()
                onSortAnimationStopped = null
            }
        } else {
            callback && callback()
        }
    }

    init()
    draw(array)
})