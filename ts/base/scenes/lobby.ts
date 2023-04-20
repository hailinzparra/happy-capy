const scene_lobby = new CoreScene()

scene_lobby.render_ui = () => {
    draw.set_color(debug.odd() ? 'red' : 'blue')
    draw.rect(32, 32, 50, 50)

    draw.set_font(font.m)
    draw.set_hvalign('left', 'top')
    draw.set_color('white')
    draw.text(32, 32 + 50 + 40, `debug index: ${debug.debug_index}`)
}
