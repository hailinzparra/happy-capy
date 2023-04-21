interface SceneLoadingProps {
    load_progress: number
}

const scene_loading = new CoreScene<SceneLoadingProps>('Loading', {
    load_progress: 0,
})

scene_loading.start = () => {
    scene_loading.props.load_progress = 0
}

scene_loading.render_ui = () => {
    scene_loading.props.load_progress += (loader.get_load_progress() - scene_loading.props.load_progress) * 0.17
    const progress_percent = Math.round(scene_loading.props.load_progress * 100)
    const loading_text = `LOADING ${progress_percent}%`

    draw.set_font(font.m.bold())
    const bar_h = draw.get_text_height(loading_text) * 1.75

    draw.set_color('#222')
    draw.rect(0, stage.size.y - bar_h, stage.size.x, bar_h)
    draw.set_color('#22f')
    draw.rect(0, stage.size.y - bar_h, scene_loading.props.load_progress * stage.size.x, bar_h)

    draw.set_hvalign('center', 'middle')
    draw.set_color('#fff')

    draw.text(stage.size.x / 2, stage.size.y - bar_h / 2 + bar_h * 0.075, loading_text)

    if (loader.get_is_loaded() && progress_percent >= 100) {
        scene.change_scene(scene_menu)
    }
}
