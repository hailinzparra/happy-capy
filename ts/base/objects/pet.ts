class Pet extends CoreGameObject {
    xs: number = 1
    ys: number = 1
    xsto: number = 1
    ysto: number = 1
    image_name: string = 'capy'
    constructor(position: CoreVec2) {
        super(position)
    }
    update(): void {
        this.xs += (this.xsto - this.xs) * 0.5
        this.ys += (this.ysto - this.ys) * 0.5

        if (this.xsto > 1) this.xsto -= 0.05
        if (this.ysto > 1) this.ysto -= 0.05
        if (this.xsto < 1) this.xsto += 0.05
        if (this.ysto < 1) this.ysto += 0.05
        if (Math.abs(1 - this.xsto) < 0.05) this.xsto = 1
        if (Math.abs(1 - this.ysto) < 0.05) this.ysto = 1
    }
    render(): void {
        draw.image_transformed(
            this.image_name,
            this.x,
            this.y,
            this.xs,
            this.ys + 0.05 * Math.sin((this.id * 127 + time.t) / 300),
            0,
        )
    }
}

obj.add_name('pet')
