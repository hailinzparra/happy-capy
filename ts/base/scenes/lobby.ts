interface SceneLobbyProps {
    back_button: HTMLElement
}

const scene_lobby = new CoreScene<SceneLobbyProps>('lobby', {
    back_button: dom.q('#lobby-back-button')!,
})

scene_lobby.props.back_button.onclick = () => {
    scene.change_scene(scene_ranch)
}
