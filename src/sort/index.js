define(require => {
    const bubble = require('./bubble')
    const heap = require('./heap')
    const quick = require('./quick')
    const select = require('./select')
    const insert = require('./insert')
    const merge = require('./merge')
    const shell = require('./shell')
    
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