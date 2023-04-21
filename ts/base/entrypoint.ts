document.addEventListener('DOMContentLoaded', async () => {
    core.stage.canvas.classList.add('main-stage')
    await core.init(document.querySelector('.main-container')!)
    core.start(scene_loading)
})
