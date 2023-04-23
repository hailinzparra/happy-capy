class State {
    constructor(
        public name: string,
        public image_name: string,
        public image_speed: number,
        public image_offset: CoreVec2,
        public end_state: State | null
    ) { }
}

class Pet extends CoreGameObject {
    state_idle: State = new State('idle', 'capy_idle', 1, new CoreVec2(0, 0), null)
    state_walking: State = new State('walking', 'capy_walking', 0.1, new CoreVec2(0, 0), null)
    state_eating: State = new State('eating', 'capy_eating', 0.1, new CoreVec2(0, 0), null)
    state_picked: State = new State('picked', 'capy_picked', 0.2, new CoreVec2(0, -0.65), null)
    state: State = this.state_idle
    image_name: string = this.state_idle.image_name
    image_index: number = 0
    image_speed: number = 1
    walking_points: CoreVec2[] = []
    walking_speed: number = 4
    hungry: number = 1
    xs: number = 1
    ys: number = 1
    xsto: number = 1
    ysto: number = 1
    xs_direction_multiplier: number = 1
    image_angle_deg: number = 0
    image_offset: CoreVec2 = new CoreVec2()
    target_food: Food | null = null
    constructor(position: CoreVec2) {
        super(position)
        this.change_state(this.state_idle)
        this.create_alarm('set_random_walking_point', 5000, () => {
            if (!this.is_hungry() || !this.target_food) {
                this.walking_points.push(new CoreVec2(math.range(stage.size.x), math.range(stage.size.y)))
            }
            // restart
            let int = 1000 + math.range(2000)
            if (this.alarms['set_random_walking_point'].trigger_count % 5 === 0) {
                int *= 10
            }
            this.restart_alarm('set_random_walking_point', int)
        })
    }
    change_state(new_state: State) {
        this.state = new_state
        this.image_name = this.state.image_name
        this.image_index = 0
        this.image_speed = this.state.image_speed
        this.image_offset.set(this.state.image_offset)
        if (this.state === this.state_picked) {
            this.walking_points.length = 0
        }
    }
    is_hungry() {
        return this.hungry < 0.5
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

        this.image_angle_deg *= 0.9

        this.hungry -= time.dt / 1000
        if (this.hungry < 0) this.hungry = 0

        switch (this.state) {
            case this.state_picked:
                const xdif = input.pointer_position.x - input.pointer_previous_position.x
                if (Math.abs(xdif) > 1) {
                    if (input.pointer_position.x < input.pointer_previous_position.x) {
                        this.xs_direction_multiplier = -1
                    }
                    else {
                        this.xs_direction_multiplier = 1
                    }
                }
                if (Math.abs(xdif) > 10) {
                    this.image_angle_deg += this.xs_direction_multiplier
                }
                break
            case this.state_eating:
                this.hungry += time.dt / 100
                if (this.hungry > 1) this.hungry = 1
                if (this.image_index > 12) {
                    if (this.target_food) {
                        obj.remove(this.target_food.id)
                        this.target_food = null
                    }
                    this.change_state(this.state_idle)
                }
                break
            case this.state_walking:
                if (this.walking_points.length > 0) {
                    const target = this.walking_points[0]
                    const distance_to_target = math.distance(this.position.x, this.position.y, target.x, target.y)
                    if (distance_to_target < 5) {
                        this.walking_points.shift()
                    }
                    else {
                        const angle_dif = Math.atan2(target.y - this.position.y, target.x - this.position.x)
                        this.position.x += Math.cos(angle_dif) * this.walking_speed
                        this.position.y += Math.sin(angle_dif) * this.walking_speed
                        if (this.position.x < this.previous_position.x) {
                            this.xs_direction_multiplier = -1
                        }
                        else {
                            this.xs_direction_multiplier = 1
                        }
                    }
                }
                else {
                    this.change_state(this.state_idle)
                }
                break
            default:
                if (this.is_hungry()) {
                    if (this.target_food === null) {
                        const nearest_food = obj.nearest<Food>('food', this.position.x, this.position.y)
                        if (nearest_food) {
                            this.target_food = nearest_food
                        }
                    }
                    if (this.target_food) {
                        if (math.distance(this.position.x, this.position.y, this.target_food.x, this.target_food.y) < 10) {
                            this.change_state(this.state_eating)
                            return
                        }
                        else {
                            this.walking_points.push(this.target_food.position)
                        }
                    }
                }
                if (this.walking_points.length > 0) {
                    this.change_state(this.state_walking)
                }
                break
        }
    }
    draw_self() {
        this.image_index += time.dt * this.image_speed
        const ys_squish = 0.05 * Math.sin((this.id * 127 + time.t) / 300)
        const xoff = (this.image_offset.x * draw.strips[this.image_name].image_width) || 0
        const yoff = (this.image_offset.y * draw.strips[this.image_name].image_height) || 0
        draw.strip_transformed(
            this.image_name,
            Math.round(this.image_index),
            this.position.x + xoff,
            this.position.y + yoff,
            this.xs * this.xs_direction_multiplier,
            this.ys + ys_squish,
            this.image_angle_deg,
        )
    }
    render(): void {
        this.depth = -this.position.y
        this.draw_self()
        if (this.is_hungry()) {
            draw.set_color('white')
            draw.set_font(font.m)
            draw.set_hvalign('center', 'bottom')
            draw.text(this.x, this.y - 72, 'Hungry')
        }
        // draw.set_color('white')
        // draw.set_font(font.m)
        // draw.set_hvalign('center', 'top')
        // draw.text(this.x, this.y + 20, this.state.name + `${this.is_hungry() ? ' + hungry' : ''}`)
        // draw.set_color('black')
        // draw.rect(this.x - 50, this.y + 80, 100, 20)
        // draw.set_color('white')
        // draw.rect(this.x - 50, this.y + 80, 100 * this.hungry, 20)
    }
}

obj.add_name('pet')
