interface Core {
    events: CoreEvents
    math: CoreMath
    common: CoreCommon
    dom: CoreDOM
    stage: CoreStage
    input: CoreInput
    time: CoreTime
    font: CoreFontManager
    draw: CoreDraw
    scene: CoreSceneManager
    obj: CoreObjectManager
    debug: CoreDebug
    runner: CoreRunner
    loader: CoreLoader
    init(canvas_parent: Element): Promise<void>
    start(starting_scene: CoreScene): void
}

declare const core: Core

core.init = async (canvas_parent) => {
    canvas_parent.appendChild(core.stage.canvas)
    return new Promise((resolve) => {
        setTimeout(() => {
            core.stage.resize_event()
            resolve()
        }, 500)
    })
}

core.start = (starting_scene) => {
    core.scene.change_scene(starting_scene)
    core.runner.run()
}
