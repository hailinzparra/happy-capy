interface SceneMenuProps {
    state: 'Menu' | 'Choosing Save'
    play_button: HTMLElement
    change_state(new_state: SceneMenuProps['state']): void
}

const scene_menu = new CoreScene<SceneMenuProps>('Menu', {
    state: 'Menu',
    play_button: dom.q('#menu-play-button')!,
    change_state(new_state) {
        this.state = new_state
        switch (this.state) {
            case 'Choosing Save':
                break
            default:

                break
        }
    },
})

scene_menu.props.play_button.onclick = () => {
}
