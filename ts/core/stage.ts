interface CoreStage {
    canvas: HTMLCanvasElement
    canvas_bounding_client_rect: DOMRect
    canvas_scale: number
    size: CoreVec2
    clear_canvas(): void
    resize_event(): void
}

core.stage = {
    canvas: document.createElement('canvas'), // dummy canvas
    canvas_bounding_client_rect: new DOMRect(0, 0, 0, 0),
    canvas_scale: 1,
    size: new CoreVec2(300, 150),
    clear_canvas() {
        this.canvas.getContext('2d')!.clearRect(0, 0, this.size.x, this.size.y)
    },
    resize_event() {
        this.canvas_bounding_client_rect = core.stage.canvas.getBoundingClientRect()
        this.canvas_scale = G_BASE_CANVAS_HEIGHT / this.canvas_bounding_client_rect.height
        this.canvas.width = this.canvas_bounding_client_rect.width * this.canvas_scale
        this.canvas.height = this.canvas_bounding_client_rect.height * this.canvas_scale
        this.size.set(this.canvas.width, this.canvas.height)
    }
}

window.addEventListener('resize', () => core.stage.resize_event())
