class Alarm {
    tick: number
    default_interval: number
    callbacks: Function[] = []
    constructor(default_interval: number, is_auto_start: boolean = true) {
        this.tick = -1
        this.default_interval = default_interval
        if (is_auto_start) {
            this.tick = this.default_interval
        }
    }
    on_alarm(callback: Function) {
        this.callbacks.push(callback)
    }
    restart() {
        this.tick = this.default_interval
    }
    update() {
        if (this.tick < 0 && this.tick !== -1) {
            for (let i = 0; i < this.callbacks.length; i++) {
                this.callbacks[i].call(this)
            }
            this.tick = -1
        }
        else {
            this.tick -= time.dt
        }
    }
}
