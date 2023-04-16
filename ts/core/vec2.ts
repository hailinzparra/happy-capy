class CoreVec2 {
    static RAD_TO_DEG: number = 180 / Math.PI
    static DEG_TO_RAD: number = Math.PI / 180
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    get_length() {
        return Math.hypot(this.x, this.y)
    }
    get_direction_rad() {
        return Math.atan2(this.y, this.x)
    }
    get_direction_deg() {
        return this.get_direction_rad() * CoreVec2.RAD_TO_DEG
    }
    set(x: number | CoreVec2, y?: number) {
        if (x instanceof CoreVec2) {
            y = x.y
            x = x.x
        }
        this.x = x
        this.y = (typeof y === 'undefined' ? this.y : y)
        return this
    }
    add(x: number | CoreVec2, y?: number) {
        if (x instanceof CoreVec2) {
            y = x.y
            x = x.x
        }
        this.x += x
        this.y += (typeof y === 'undefined' ? this.y : y)
        return this
    }
    dot(v: CoreVec2) {
        return this.get_length() * v.get_length() * Math.cos(this.get_direction_rad() * v.get_direction_rad())
    }
    reset() {
        this.set(0, 0)
    }
    lerp_to(target: CoreVec2, t: number = 0.1) {
        this.x += (target.x - this.x) * t
        this.y += (target.y - this.y) * t
    }
    static one: CoreVec2 = new CoreVec2(1, 1)
    static zero: CoreVec2 = new CoreVec2(0, 0)
    static half: CoreVec2 = new CoreVec2(0.5, 0.5)
    static polar(magnitude: number, direction_deg: number) {
        direction_deg = direction_deg * CoreVec2.DEG_TO_RAD
        return new CoreVec2(magnitude * Math.cos(direction_deg), magnitude * Math.sin(direction_deg))
    }
}
