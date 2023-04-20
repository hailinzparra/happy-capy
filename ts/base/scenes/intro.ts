interface SceneIntro {
    intro_time: number
    intro_duration: number
}

const scene_intro = new CoreScene<SceneIntro>({
    intro_time: 0,
    intro_duration: 2000,
})

scene_intro.start = () => {
    scene_intro.props.intro_time = 0
}

scene_intro.render_ui = () => {
    const p = scene_intro.props
    p.intro_time += time.dt
    const s = math.clamp(p.intro_time / p.intro_duration, 0, 1)

    draw.set_font(font.m.bold())
    draw.set_hvalign('center', 'middle')
    draw.set_color('#fff')

    draw.on_transform(stage.size.x / 2, stage.size.y / 2, 1.2 - 0.2 * s, 1.2 - 0.2 * s, 0, () => {
        draw.text(0, 0, 'A widad presents')
    })

    if (p.intro_time > p.intro_duration) {
        scene.change_scene(scene_lobby)
    }
}
