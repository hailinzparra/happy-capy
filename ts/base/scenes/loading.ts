const scene_loading = new CoreScene()

scene_loading.start = () => {
}

scene_loading.render = () => {
    const loading_text = `LOADING ${loader.get_load_progress() * 100}%`

    draw.set_font(font.l.bold())
    const th = draw.get_text_height(loading_text)

    draw.set_hvalign('center', 'middle')
    draw.set_color('white')

    draw.text(stage.size.x / 2, stage.size.y - th / 2, loading_text)
    draw.rect(0, stage.size.y - th, loader.get_load_progress() * stage.size.x, th)
    if (loader.get_is_loaded()) {
        scene.change_scene(scene_lobby)
    }
}
