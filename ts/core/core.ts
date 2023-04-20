interface Core {
    math: CoreMath
    stage: CoreStage
    input: CoreInput
    time: CoreTime
    font: CoreFontManager
    draw: CoreDraw
    scene: CoreSceneManager
    obj: CoreObjectManager
    runner: CoreRunner
    loader: CoreLoader
    init(canvas_parent: Element): void
    start(starting_scene: CoreScene): void
}

declare const core: Core

core.init = (canvas_parent) => {
    canvas_parent.appendChild(core.stage.canvas)
    setTimeout(() => {
        core.stage.resize_event()
    }, 500)
}

core.start = (starting_scene) => {
    core.scene.change_scene(starting_scene)
    core.runner.run()
}
