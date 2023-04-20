interface Core {
    math: CoreMath
    stage: CoreStage
    input: CoreInput
    time: CoreTime
    font: CoreFontManager
    draw: CoreDraw
    scene: CoreSceneManager
    runner: CoreRunner
    loader: CoreLoader
    init(canvas_parent: Element): void
}

declare const core: Core

core.init = (canvas_parent) => {
    canvas_parent.appendChild(core.stage.canvas)
    setTimeout(() => {
        core.stage.resize_event()
    }, 500)
}
