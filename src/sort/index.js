define(require => {
    const bubble = require('./bubble.v2')
    const heap = require('./heap.v2')
    const quick = require('./quick.v2')
    const select = require('./select.v2')
    const insert = require('./insert.v2')
    const merge = require('./merge.v2')
    const shell = require('./shell.v2')
    
    return {
        bubble,
        heap,
        quick,
        select,
        insert,
        merge,
        shell
    }
})