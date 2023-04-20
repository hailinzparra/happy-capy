class Pet extends CoreGameObject {
    color_index: number = 0
    constructor(position: CoreVec2) {
        super(position)

        this.create_alarm('change_color', math.range(200, 400), () => {
            this.color_index++
            this.alarms['change_color'].restart()
        })
    }
    physics_update(dt: number): void {
        const s = this.id % 2 === 0 ? -1 : 1
        this.position.x += 2 * dt * s
        this.position.y += 2 * dt * s
    }
    update(): void {
        this.is_visible = !this.is_outside_stage(32)
    }
    render(): void {
        draw.set_color(this.color_index % 2 === 0 ? 'red' : 'blue')
        draw.rect(this.position.x, this.position.y, 32, 32)
    }
}

obj.add_name('pet')
