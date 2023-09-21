function switchTab(e, styleKey) {
    const a = e.currentTarget
    const key = a.dataset.key
    const text = a.dataset.text

    const _case = document.querySelector('#ACFFRDRVMIJN')
    const h4 = _case.querySelector('h4')
    h4.innerText = `${key} ${text}`
    const div = _case.querySelector('div')
    __onStyleKeyChange__(div, key)
}