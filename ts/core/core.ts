interface Core {
    init(canvas_parent: Element): void
    stage: CoreStage
    input: CoreInput
}

declare const core: Core

core.init = (canvas_parent) => {
    canvas_parent.appendChild(core.stage.canvas)
    setTimeout(() => {
        core.stage.resize_event()
    }, 500)
}
