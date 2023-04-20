const scene_lobby = new CoreScene<{ fps: number }>({
    fps: 60,
})

scene_lobby.start = () => {
    for (let i = 0; i < 20000; i++) {
        obj.instantiate('pet', new Pet(new CoreVec2(math.range(stage.size.x), math.range(stage.size.y))))
    }
}

scene_lobby.render_ui = () => {
    scene_lobby.props.fps += (time.fps - scene_lobby.props.fps) * 0.5

    draw.set_color(debug.odd() ? 'red' : 'blue')
    draw.rect(32, 32, 50, 50)

    draw.set_font(font.m)
    draw.set_hvalign('left', 'top')
    draw.set_color('white')
    draw.text(32, 32 + 50 + 40, `debug index: ${debug.debug_index}\n${obj.take('pet').filter(n => n.is_visible).length}\nFPS: ${Math.round(scene_lobby.props.fps)}`)
}
