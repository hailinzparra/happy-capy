const loop = () => {
    const ctx = core.stage.canvas.getContext('2d')!
    ctx.clearRect(0, 0, core.stage.canvas.width, core.stage.canvas.height)

    for (const t of core.input.ongoing_touches) {
        ctx.beginPath()
        ctx.arc(t.position.x, t.position.y, 50, 0, 2 * Math.PI)
        ctx.fillStyle = `hsl(${+t.id * 20}, 50%, 40%)`
        ctx.fill()
        if (t.is_held) {
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 4
            ctx.stroke()
        }
    }

    if (core.input.first_ongoing_touch) {
        const t = core.input.first_ongoing_touch
        ctx.beginPath()
        ctx.arc(t.position.x, t.position.y, 60, 0, 2 * Math.PI)
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 20
        ctx.stroke()
    }

    ctx.beginPath()
    ctx.arc(core.input.pointer_position.x, core.input.pointer_position.y, 70, 0, 2 * Math.PI)
    ctx.strokeStyle = '#f0f'
    ctx.lineWidth = 20
    ctx.stroke()

    core.input.reset()
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
