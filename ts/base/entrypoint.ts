document.addEventListener('DOMContentLoaded', async () => {
    dom.add_class(core.stage.canvas, 'main-stage')
    await core.init(dom.q('.main-container')!)
    core.start(scene_loading)
})
