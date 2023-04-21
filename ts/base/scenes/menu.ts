interface SceneMenuProps {
    state: 'Menu' | 'Choosing Save'
    menu_container: HTMLElement
    choosing_save_container: HTMLElement
    play_button: HTMLElement
    back_button: HTMLElement
    save_button_container: HTMLElement
    change_state(new_state: SceneMenuProps['state']): void
}

const scene_menu = new CoreScene<SceneMenuProps>('Menu', {
    state: 'Menu',
    menu_container: dom.q('#menu-menu-container')!,
    choosing_save_container: dom.q('#menu-choosing-save-container')!,
    play_button: dom.q('#menu-play-button')!,
    back_button: dom.q('#menu-back-button')!,
    save_button_container: dom.q('#menu-save-button-container')!,
    change_state(new_state) {
        this.state = new_state
        switch (this.state) {
            case 'Choosing Save':
                dom.hide(this.menu_container)
                dom.show(this.choosing_save_container)
                break
            default:
                dom.hide(this.choosing_save_container)
                dom.show(this.menu_container)
                break
        }
    },
})

scene_menu.props.play_button.onclick = () => {
    scene_menu.props.change_state('Choosing Save')
}

scene_menu.props.back_button.onclick = () => {
    scene_menu.props.change_state('Menu')
}

scene_menu.props.save_button_container.querySelectorAll<HTMLElement>('.menu-save-button').forEach(n => {
    n.onclick = () => {
        // load game
        // console.log(n.getAttribute('menu-save-button-id'))
        scene.change_scene(scene_ranch)
    }
})

scene_menu.start = () => {
    scene_menu.props.change_state('Menu')
}
