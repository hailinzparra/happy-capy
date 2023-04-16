interface CoreDebug {
    debug_index: number
    debug_number: number
    is_debug_odd(): boolean
    is_debug_even(): boolean
    update(): void
}

core.debug = {
    debug_index: 0,
    debug_number: 4,
    is_debug_odd() {
        return this.debug_index % 2 !== 0
    },
    is_debug_even() {
        return this.debug_index % 2 === 0
    },
    update() {
        if (core.input.key_down('KeyU')) {
            this.debug_index = ++this.debug_index % this.debug_number
        }
    }
}
