interface CoreDebug {
    debug_index: number
    odd(): boolean
}

core.debug = {
    debug_index: 0,
    odd() {
        return this.debug_index % 2 !== 0
    },
}

window.addEventListener('keydown', ev => {
    if (ev.ctrlKey && ev.shiftKey && ev.code === G_DEBUG_KEYCODE) {
        core.debug.debug_index = ++core.debug.debug_index % G_DEBUG_INDEX_AMOUNT
    }
})
