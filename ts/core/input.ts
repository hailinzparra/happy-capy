interface CoreInput {
    is_touch_supported: boolean
    /**
     * Pointer position: mouse position or last touch position relative to `core.stage.canvas`
     */
    pointer_position: CoreVec2
    pointer_previous_position: CoreVec2
    mouse_position: CoreVec2
    is_moving: boolean
    is_mouse_moving: boolean
    is_moving_timeout_id: number
    is_mouse_moving_timeout_id: number
    mouses: CoreInputKey[]
    /**
     * Ongoing touches, indexed by `identifier`, note that `identifier` is incremental in iOS, so `ongoing_touches[0]` will not always be the first touch
     */
    ongoing_touches: CoreInputTouch[]
    first_ongoing_touch: CoreInputTouch | null
    process_position(x: number, y: number): CoreVec2
    update_position(new_position: CoreVec2): void
    update_mouse_position(new_position: CoreVec2): void
    mouse_up(button: number): boolean
    mouse_down(button: number): boolean
    mouse_hold(button: number): boolean
    pointer_up(): boolean
    pointer_down(): boolean
    pointer_hold(): boolean
    reset(): void
}

class CoreInputKey {
    id: string | number
    is_held: boolean = false
    is_pressed: boolean = false
    is_released: boolean = false
    constructor(id: CoreInputKey['id']) {
        this.id = id
    }
    up() {
        this.is_held = false
        this.is_released = true
    }
    down() {
        if (!this.is_held) {
            this.is_held = true
            this.is_pressed = true
        }
    }
    /**
     * Call every frame at the end to make sure `is_pressed` and `is_released` only true in one frame
     */
    reset() {
        this.is_pressed = false
        this.is_released = false
    }
    get_status_text() {
        if (this.is_released) return CORE_INPUT_KEY_STATUS_TEXT_RELEASED
        if (this.is_pressed) return CORE_INPUT_KEY_STATUS_TEXT_PRESSED
        if (this.is_held) return CORE_INPUT_KEY_STATUS_TEXT_HELD
        return CORE_INPUT_KEY_STATUS_TEXT_IDLE
    }
}

class CoreInputTouch extends CoreInputKey {
    position: CoreVec2 = new CoreVec2()
    previous_position: CoreVec2 = new CoreVec2()
    constructor(id: CoreInputTouch['id']) {
        super(id)
    }
    update_position(new_position: CoreVec2) {
        this.previous_position.set(this.position)
        this.position.set(new_position)
    }
}

core.input = {
    is_touch_supported: ('ontouchstart' in window) || window.navigator.maxTouchPoints ? true : false,
    pointer_position: new CoreVec2(),
    pointer_previous_position: new CoreVec2(),
    mouse_position: new CoreVec2(),
    is_moving: false,
    is_mouse_moving: false,
    is_moving_timeout_id: -1,
    is_mouse_moving_timeout_id: -1,
    mouses: [],
    ongoing_touches: [],
    first_ongoing_touch: null,
    process_position(x, y) {
        const b = core.stage.canvas_bounding_client_rect
        const s = core.stage.canvas_scale
        return new CoreVec2((x - b.x) * s, (y - b.y) * s)
    },
    update_position(p) {
        this.pointer_previous_position.set(this.pointer_position)
        this.pointer_position.set(p)
    },
    update_mouse_position(p) {
        this.mouse_position.set(p)
        this.update_position(this.mouse_position)
    },
    mouse_up(button) {
        return this.mouses[button].is_released
    },
    mouse_down(button) {
        return this.mouses[button].is_pressed
    },
    mouse_hold(button) {
        return this.mouses[button].is_held
    },
    pointer_up() {
        if (!this.first_ongoing_touch) return this.mouse_up(0)
        return this.first_ongoing_touch.is_released
    },
    pointer_down() {
        if (!this.first_ongoing_touch) return this.mouse_down(0)
        return this.first_ongoing_touch.is_pressed
    },
    pointer_hold() {
        if (!this.first_ongoing_touch) return this.mouse_hold(0)
        return this.first_ongoing_touch.is_held
    },
    reset() {
        this.mouses.forEach(m => m.reset())
        this.ongoing_touches.forEach(t => t.reset())
    },
}

// Create inputs
for (let i = 0; i < G_CORE_INPUT_MOUSE_AMOUNT; i++) {
    core.input.mouses.push(new CoreInputKey(i))
}

for (let i = 0; i < G_CORE_INPUT_TOUCH_AMOUNT; i++) {
    core.input.ongoing_touches.push(new CoreInputTouch(i))
}

// Setup events
window.addEventListener('mouseup', ev => {
    const id = ev.button % G_CORE_INPUT_MOUSE_AMOUNT
    core.input.mouses[id].up()
    core.input.update_mouse_position(core.input.process_position(ev.clientX, ev.clientY))
})

window.addEventListener('mousedown', ev => {
    const id = ev.button % G_CORE_INPUT_MOUSE_AMOUNT
    core.input.mouses[id].down()
    core.input.update_mouse_position(core.input.process_position(ev.clientX, ev.clientY))
})

window.addEventListener('mousemove', ev => {
    core.input.update_mouse_position(core.input.process_position(ev.clientX, ev.clientY))
    core.input.is_mouse_moving = true
    window.clearTimeout(core.input.is_mouse_moving_timeout_id)
    core.input.is_mouse_moving_timeout_id = window.setTimeout(
        () => core.input.is_mouse_moving = false,
        G_CORE_INPUT_DEFAULT_MOVING_TIMEOUT,
    )
})

window.addEventListener('touchstart', ev => {
    for (let i = 0; i < ev.changedTouches.length; i++) {
        const t = ev.changedTouches[i]
        const id = t.identifier % G_CORE_INPUT_TOUCH_AMOUNT
        core.input.ongoing_touches[id].down()
        core.input.ongoing_touches[id].update_position(core.input.process_position(t.clientX, t.clientY))
        const ft = core.input.first_ongoing_touch
        if (!ft || (!ft.is_held && !ft.is_released)) {
            core.input.first_ongoing_touch = core.input.ongoing_touches[id]
        }
    }
    if (core.input.first_ongoing_touch) core.input.update_position(core.input.first_ongoing_touch.position)
})

window.addEventListener('touchmove', ev => {
    for (let i = 0; i < ev.changedTouches.length; i++) {
        const t = ev.changedTouches[i]
        const id = t.identifier % G_CORE_INPUT_TOUCH_AMOUNT
        core.input.ongoing_touches[id].update_position(core.input.process_position(t.clientX, t.clientY))
    }
    if (core.input.first_ongoing_touch) core.input.update_position(core.input.first_ongoing_touch.position)
})

window.addEventListener('touchcancel', ev => {
    for (let i = 0; i < ev.changedTouches.length; i++) {
        const t = ev.changedTouches[i]
        const id = t.identifier % G_CORE_INPUT_TOUCH_AMOUNT
        core.input.ongoing_touches[id].up()
        core.input.ongoing_touches[id].update_position(core.input.process_position(t.clientX, t.clientY))
    }
    if (core.input.first_ongoing_touch) core.input.update_position(core.input.first_ongoing_touch.position)
})

window.addEventListener('touchend', ev => {
    for (let i = 0; i < ev.changedTouches.length; i++) {
        const t = ev.changedTouches[i]
        const id = t.identifier % G_CORE_INPUT_TOUCH_AMOUNT
        core.input.ongoing_touches[id].up()
        core.input.ongoing_touches[id].update_position(core.input.process_position(t.clientX, t.clientY))
    }
    if (core.input.first_ongoing_touch) core.input.update_position(core.input.first_ongoing_touch.position)
})
