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
    let currentKey = '' // current sort key.
    let stopSignal = false
    let isRunning = false 
    let pauseSignal = false
    let isPaused = false
    let onSortAnimationStopped = null
    let onSortAnimationPaused = null
    const sortKeys = [
        'bubble', 'insert', 'select', 'heap', 'quick', 'merge'
    ]

    const init = () => {
        const ratio = window.devicePixelRatio
        canvas = document.createElement('canvas')
        canvas.width = Math.floor(WIDTH * ratio)
        canvas.height = Math.floor(HEIGHT * ratio)
        canvas.style.border = '4px solid #bcd'
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
                    const handle = () => {
                        currentKey = key
                        playSortAnimation(key)
                    }
                    if (isRunning) {
                        stopSortAnimation(handle)
                    } else {
                        handle()
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
            const handle = () => {
                util.disOrder(array)
                draw(array)
                currentKey && playSortAnimation(currentKey)
            }
            if (isRunning) {
                stopSortAnimation(handle)
            } else {
                handle()
            }
        })
        const stopButton = createButton('Stop', () => {
            stopSortAnimation()
        })
        const pauseButton = createButton('Pause', () => {
            pauseSortAnimation()
        })
        const resumeButton = createButton('Resume', () => {
            resumeSortAnimation()
        })
        ctrlsWrap.appendChild(disOrderButton)
        ctrlsWrap.appendChild(stopButton)
        ctrlsWrap.appendChild(pauseButton)
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
                    // normally stopped.
                    isRunning = false
                    alert('Over')
                } else {
                    this.next()
                }
            } else {
            }
        },
        clear() {
            this.size = 0
            this.stack.forEach(g => {
                g.return()
            })
            this.stack = []
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
        sorter.onSwap(() => {
            if (stopSignal) {
                onSortAnimationStopped && onSortAnimationStopped()
                return
            }
            if (pauseSignal) {
                onSortAnimationPaused && onSortAnimationPaused()
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
                    // start the generator in stack.
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

    const resumeSortAnimation = () => {
        if (isPaused) {
            sortGenManager.next()
            isPaused = false
        }
    }

    const stopSortAnimation = (callback) => {
        if (!isRunning) return
        stopSignal = true
        onSortAnimationStopped = () => {
            stopSignal = false
            isRunning = false
            wait(() => {
                sortGenManager.clear()
                callback && callback()
                onSortAnimationStopped = null
            })
        }
    }

    const pauseSortAnimation = (callback) => {
        if (!isRunning) return
        if (isPaused) return
        pauseSignal = true
        onSortAnimationPaused = () => {
            isPaused = true
            pauseSignal = false
            callback && callback()
            onSortAnimationPaused = null
        }
    }

    init()
    draw(array)
})