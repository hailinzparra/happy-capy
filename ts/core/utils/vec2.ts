class CoreVec2 {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
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
        this.y += (typeof y === 'undefined' ? 0 : y)
        return this
    }
}
