class CoreVec2 {
    x: number
    y: number
    constructor(x: number | CoreVec2 = 0, y: number = 0) {
        if (x instanceof CoreVec2) {
            y = x.y
            x = x.x
        }
        this.x = x
        this.y = y
        return this
    }
    set(x: number | CoreVec2, y: number = this.y) {
        if (x instanceof CoreVec2) {
            y = x.y
            x = x.x
        }
        this.x = x
        this.y = y
        return this
    }
    add(x: number | CoreVec2, y: number = 0) {
        if (x instanceof CoreVec2) {
            y = x.y
            x = x.x
        }
        this.x += x
        this.y += y
        return this
    }
}
