const scene_lobby = new CoreScene('Lobby')

let selected_object: Pet | Food | null = null
const selected_pos_gap = new CoreVec2()

scene_lobby.start = () => {
    obj.instantiate('pet', new Pet(new CoreVec2(math.range(stage.size.x), math.range(stage.size.y))))
}

scene_lobby.update = () => {
    if (selected_object) {
        if (input.pointer_up()) {
            selected_object.xsto = 1.3
            selected_object.ysto = 0.7
            selected_object = null
        }
        else {
            selected_object.xsto = 0.88
            selected_object.ysto = 1.12
            selected_object.position.set(input.pointer_position.x - selected_pos_gap.x, input.pointer_position.y - selected_pos_gap.y)
        }
    }
    else {
        if (input.pointer_down()) {
            for (const n of obj.take<Pet | Food>('pet', 'food')) {
                if (math.distance(input.pointer_position.x, input.pointer_position.y, n.x, n.y) < 64) {
                    selected_pos_gap.set(input.pointer_position.x - n.x, input.pointer_position.y - n.y)
                    selected_object = n
                    break
                }
            }
        }
    }
}

scene_lobby.render_ui = () => {
}
