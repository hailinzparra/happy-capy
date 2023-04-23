interface CoreObjectManager {
    _ID: number
    names: string[]
    instances: CoreObject[][]
    add_name(name: string): number
    get_index(name: string): number
    update_all(): void
    render_all(): void
    render_ui_all(): void
    /**
     * Push instance, give it unique id, and call `start`
     */
    instantiate<T = CoreObject>(name: string, instance: T): T
    take<T = CoreObject>(...names: string[]): T[]
    get<T = CoreObject>(id: number): T | null
    remove(id: number): CoreObject | null
    clear_all(): void
    nearest<T = CoreObject>(name: string, x: number, y: number): T | null
}

class CoreObject {
    x: number
    y: number
    id: number = 0
    depth: number = 0
    is_active: boolean = true
    is_visible: boolean = true
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    start() { }
    pre_update() { }
    update() { }
    post_update() { }
    inactive_update() { }
    render() { }
    render_ui() { }
}

class CoreGameObjectAlarm {
    tick_ms: number
    interval_ms: number
    callbacks: Function[] = []
    trigger_count: number = 0
    constructor(interval_ms: number, is_auto_start: boolean = true) {
        this.tick_ms = G_CORE_GAME_OBJECT_ALARM_DEACTIVATE_NUMBER
        this.interval_ms = interval_ms
        if (is_auto_start) this.restart()
    }
    on_alarm(callback: Function) {
        this.callbacks.push(callback)
    }
    /**
     * Call at callback to reset alarm
     */
    restart(interval_ms: number = this.interval_ms) {
        this.tick_ms = interval_ms
    }
    trigger() {
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].call(this)
        }
        this.trigger_count++
    }
    update() {
        if (this.tick_ms === G_CORE_GAME_OBJECT_ALARM_DEACTIVATE_NUMBER) return
        if (this.tick_ms < 0) {
            this.tick_ms = G_CORE_GAME_OBJECT_ALARM_DEACTIVATE_NUMBER
            this.trigger()
        }
        else {
            this.tick_ms -= time.udt
        }
    }
}

class CoreGameObject extends CoreObject {
    position: CoreVec2
    /**
     * Recorded position at the start of pre update before calling `before_update`
     */
    previous_position: CoreVec2
    alarms: { [name: string]: CoreGameObjectAlarm } = {}
    constructor(position: CoreVec2) {
        super(position.x, position.y)
        this.position = position
        this.previous_position = new CoreVec2(this.position)
    }
    create_alarm(name: string, interval_ms: number, callback: Function) {
        this.alarms[name] = new CoreGameObjectAlarm(interval_ms)
        this.alarms[name].on_alarm(callback)
        return this.alarms[name]
    }
    restart_alarm(name: string, interval_ms?: number) {
        this.alarms[name].restart(interval_ms)
    }
    before_update() { }
    after_update() { }
    alarm_update() {
        for (const name in this.alarms) {
            this.alarms[name].update()
        }
    }
    physics_update(dt: number) { }
    pre_update() {
        this.previous_position.set(this.position)
        this.alarm_update()
        this.before_update()
        this.physics_update(core.time.dt)
    }
    post_update() {
        this.x = this.position.x
        this.y = this.position.y
        this.after_update()
    }
    /**
     * Returns true if current position plus given margin is outside of the stage
     */
    is_outside_stage(xmargin: number = 0, ymargin: number = xmargin): boolean {
        return this.position.x + xmargin < 0
            || this.position.x - xmargin > core.stage.size.x
            || this.position.y + ymargin < 0
            || this.position.y - ymargin > core.stage.size.y
    }
}

core.obj = {
    _ID: 0,
    names: [],
    instances: [],
    add_name(name) {
        this.instances.push([])
        return this.names.push(name) - 1
    },
    get_index(name) {
        return this.names.indexOf(name)
    },
    update_all() {
        for (let i = this.instances.length - 1; i >= 0; i--) {
            for (let j = this.instances[i].length - 1; j >= 0; j--) {
                if (this.instances[i][j].is_active) {
                    this.instances[i][j].pre_update()
                    // Check if instance is not removed
                    if (this.instances[i][j]) this.instances[i][j].update()
                    if (this.instances[i][j]) this.instances[i][j].post_update()
                }
                else {
                    this.instances[i][j].inactive_update()
                }
            }
        }
    },
    render_all() {
        const h: CoreObject[] = []
        for (let i = this.instances.length - 1; i >= 0; i--) {
            for (let j = this.instances[i].length - 1; j >= 0; j--) {
                if (this.instances[i][j].is_visible) {
                    h.push(this.instances[i][j])
                }
            }
        }
        h.sort((a, b) => a.depth - b.depth)
        for (let i = h.length - 1; i >= 0; i--) {
            h[i].render()
        }
    },
    render_ui_all() {
        const h: CoreObject[] = []
        for (let i = this.instances.length - 1; i >= 0; i--) {
            for (let j = this.instances[i].length - 1; j >= 0; j--) {
                if (this.instances[i][j].is_visible) {
                    h.push(this.instances[i][j])
                }
            }
        }
        h.sort((a, b) => a.depth - b.depth)
        for (let i = h.length - 1; i >= 0; i--) {
            h[i].render_ui()
        }
    },
    instantiate(name, n) {
        this.instances[this.get_index(name)].push((n as CoreObject));
        (n as CoreObject).id = this._ID++
        (n as CoreObject).start()
        return n
    },
    take(...names) {
        let h: any[] = []
        for (const name of names) {
            h = h.concat(this.instances[this.get_index(name)])
        }
        return h
    },
    get(id) {
        for (let i = this.instances.length - 1; i >= 0; i--) {
            for (let j = this.instances[i].length - 1; j >= 0; j--) {
                if (this.instances[i][j].id === id) {
                    return this.instances[i][j] as any
                }
            }
        }
        return null
    },
    remove(id) {
        for (let i = this.instances.length - 1; i >= 0; i--) {
            for (let j = this.instances[i].length - 1; j >= 0; j--) {
                if (this.instances[i][j].id === id) {
                    return this.instances[i].splice(j, 1)[0]
                }
            }
        }
        return null
    },
    clear_all() {
        for (let i = this.instances.length - 1; i >= 0; i--) {
            this.instances[i].length = 0
        }
    },
    nearest(name, x, y) {
        let l = -1
        let m = null
        for (const n of this.instances[this.get_index(name)]) {
            const o = Math.hypot(n.x - x, n.y - y)
            if (l < 0 || o < l) {
                m = n
                l = o
            }
        }
        return m as any
    },
}
