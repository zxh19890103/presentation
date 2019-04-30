define((require) => {
    const order = require('./order')
    const binary = require('./binary')

    return {
        order,
        binary
    }
})