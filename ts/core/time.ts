interface CoreTime {
    t: number
    udt: number
    pt: number
    fps: number
    dt: number
    update(t: number): void
}

core.time = {
    t: 0,
    dt: 0,
    /**
     * Unscaled delta time
     */
    udt: 0,
    /**
     * Previous time
     */
    pt: 0,
    fps: 0,
    update(t) {
        this.pt = this.t
        this.t = t
        this.udt = this.t - this.pt
        this.fps = 1000 / this.udt
        this.dt = this.udt / (1000 / G_CORE_TIME_BASE_FPS)
    },
}
