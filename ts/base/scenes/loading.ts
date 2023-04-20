interface SceneLoading {
    after_loading_wait_time: number
    after_loading_wait_duration: number
}

const scene_loading = new CoreScene<SceneLoading>({
    after_loading_wait_time: 0,
    // after_loading_wait_duration: 1000,
    after_loading_wait_duration: 0,
})

scene_loading.start = () => {
    scene_loading.props.after_loading_wait_time = 0
}

scene_loading.render_ui = () => {
    const loading_text = `LOADING ${loader.get_load_progress() * 100}%`

    draw.set_font(font.m.bold())
    const bar_h = draw.get_text_height(loading_text) * 1.5

    draw.set_color('#22f')
    draw.rect(0, stage.size.y - bar_h, loader.get_load_progress() * stage.size.x, bar_h)

    draw.set_hvalign('center', 'middle')
    draw.set_color('#fff')

    draw.text(stage.size.x / 2, stage.size.y - bar_h / 2, loading_text)

    if (loader.get_is_loaded()) {
        const p = scene_loading.props
        p.after_loading_wait_time += time.dt
        if (p.after_loading_wait_time > p.after_loading_wait_duration) {
            // scene.change_scene(scene_intro)
            scene.change_scene(scene_lobby)
        }
    }
}
