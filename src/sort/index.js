define(require => {
    const bubble = require('./bubble')
    const heap = require('./heap')
    const quick = require('./quick')
    const select = require('./select')
    const insert = require('./insert')
    return {
        bubble,
        heap,
        quick,
        select,
        insert
    }
})