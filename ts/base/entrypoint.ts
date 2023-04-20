document.addEventListener('DOMContentLoaded', async () => {
    await core.init(document.querySelector('.main-container')!)
    core.start(scene_loading)
})
