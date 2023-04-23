interface SceneRanchProps {
    selected_object: Pet | Food | null
    selected_object_gap: CoreVec2
    selected_tool: 'hand' | 'food' | 'broom'
    hand_button: HTMLElement
    food_button: HTMLElement
    broom_button: HTMLElement
    shop_button: HTMLElement
    battle_button: HTMLElement
    back_button: HTMLElement
    change_tool(new_tool: SceneRanchProps['selected_tool']): void
}

const scene_ranch = new CoreScene<SceneRanchProps>('Ranch', {
    selected_object: null,
    selected_object_gap: new CoreVec2(0, 0),
    selected_tool: 'hand',
    hand_button: dom.q('#ranch-hand-button')!,
    food_button: dom.q('#ranch-food-button')!,
    broom_button: dom.q('#ranch-broom-button')!,
    shop_button: dom.q('#ranch-shop-button')!,
    battle_button: dom.q('#ranch-battle-button')!,
    back_button: dom.q('#ranch-back-button')!,
    change_tool(new_tool) {
        this.selected_tool = new_tool
        dom.remove_class(this.hand_button, 'selected')
        dom.remove_class(this.food_button, 'selected')
        dom.remove_class(this.broom_button, 'selected')
        switch (this.selected_tool) {
            case 'food':
                dom.add_class(this.food_button, 'selected')
                break
            case 'broom':
                dom.add_class(this.broom_button, 'selected')
                break
            default:
                dom.add_class(this.hand_button, 'selected')
                break
        }
    },
})

scene_ranch.props.hand_button.onclick = () => {
    scene_ranch.props.change_tool('hand')
}

scene_ranch.props.food_button.onclick = () => {
    scene_ranch.props.change_tool('food')
}

scene_ranch.props.broom_button.onclick = () => {
    scene_ranch.props.change_tool('broom')
}

scene_ranch.props.shop_button.onclick = () => {
    scene.change_scene(scene_shop)
}

scene_ranch.props.battle_button.onclick = () => {
    scene.change_scene(scene_lobby)
}

scene_ranch.props.back_button.onclick = () => {
    scene.change_scene(scene_menu)
}

scene_ranch.start = () => {
    // obj.instantiate('pet', new OldPet(new CoreVec2(math.range(stage.size.x), math.range(stage.size.y))))
    obj.instantiate('pet', new Pet(new CoreVec2(stage.size.x / 2, stage.size.y / 2)))
}

scene_ranch.update = () => {
    const p = scene_ranch.props
    switch (p.selected_tool) {
        case 'broom':
            if (input.pointer_down()) {
                for (const n of obj.take<Food>('food')) {
                    if (math.distance(input.pointer_position.x, input.pointer_position.y, n.x, n.y) < 64) {
                        obj.remove(n.id)
                        break
                    }
                }
            }
            break
        case 'food':
            if (input.pointer_down()) {
                if (input.pointer_position.y < stage.size.y * 0.9) {
                    obj.instantiate('food', new Food(new CoreVec2(input.pointer_position.x, input.pointer_position.y)))
                }
            }
            break
        default:
            if (p.selected_object) {
                if (input.pointer_up()) {
                    p.selected_object.xsto = 1.3
                    p.selected_object.ysto = 0.7
                    if (p.selected_object instanceof Pet) {
                        p.selected_object.change_state(p.selected_object.state_idle)
                    }
                    p.selected_object = null
                }
                else {
                    p.selected_object.xsto = 0.88
                    p.selected_object.ysto = 1.12
                    p.selected_object.position.set(
                        input.pointer_position.x - p.selected_object_gap.x,
                        input.pointer_position.y - p.selected_object_gap.y,
                    )
                }
            }
            else {
                if (input.pointer_down()) {
                    for (const n of obj.take<Pet | Food>('pet', 'food')) {
                        if (math.distance(input.pointer_position.x, input.pointer_position.y, n.x, n.y) < 64) {
                            if (n instanceof Pet) {
                                n.change_state(n.state_picked)
                            }
                            p.selected_object = n
                            p.selected_object_gap.set(input.pointer_position.x - n.x, input.pointer_position.y - n.y)
                            break
                        }
                    }
                }
            }
            break
    }
}

scene_ranch.render = () => {
    draw.image('menu_background', stage.size.x / 2, stage.size.y / 2)
}
