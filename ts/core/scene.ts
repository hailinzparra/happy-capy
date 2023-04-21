interface CoreSceneManager {
    current_scene: CoreScene
    previous_scene: CoreScene | null
    change_scene(new_scene: CoreScene): void
    restart(): void
    update(): void
    render(): void
    render_ui(): void
}

interface CoreSceneEventMap {
    'core_scene_change_scene': {
        current_scene: CoreScene
        previous_scene: CoreScene
    }
}

interface CoreEventsMap extends CoreSceneEventMap { }

class CoreScene<T = {}> {
    is_auto_clear_stage: boolean = true
    /**
     * Destroy all obj instance except persistent object on scene change, set this to `false` will make all instances in the given scene persistent
     */
    is_auto_destroy_obj: boolean = true
    is_obj_update_disabled: boolean = false
    is_obj_render_disabled: boolean = false
    name: string
    props: T = {} as any
    constructor(name: string, props?: T) {
        this.name = name
        if (props) this.props = props
    }
    start() { }
    update() { }
    render() { }
    render_ui() { }
}

core.scene = {
    current_scene: new CoreScene('Dummy'),
    previous_scene: null,
    change_scene(new_scene) {
        if (this.current_scene.is_auto_destroy_obj) {
            core.obj.clear_all()
        }
        this.previous_scene = this.current_scene
        this.current_scene = new_scene
        if (this.current_scene !== this.previous_scene) {
            this.restart()
        }
        core.events.trigger('core_scene_change_scene', {
            current_scene: this.current_scene,
            previous_scene: this.previous_scene,
        })
    },
    restart() {
        this.current_scene.start()
    },
    update() {
        this.current_scene.update()
    },
    render() {
        this.current_scene.render()
    },
    render_ui() {
        this.current_scene.render_ui()
    },
}
