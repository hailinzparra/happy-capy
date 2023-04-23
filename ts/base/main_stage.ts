const main_stage = {
    get_list() {
        return dom.qa('.main-stage')
    },
    unhide(el: Element) {
        dom.remove_class(el, 'hidden')
    },
    hide_all() {
        this.get_list().forEach(el => dom.add_class(el, 'hidden'))
    },
    change(el: Element) {
        this.hide_all()
        this.unhide(el)
    }
}

events.on('core_scene_change_scene', ev => {
    switch (ev.current_scene) {
        case scene_loading:
            main_stage.change(stage.canvas)
            break
        case scene_menu:
            main_stage.change(dom.q('.main-stage#stage-menu')!)
            break
        case scene_ranch:
            main_stage.change(dom.q('.main-stage#stage-ranch')!)
            main_stage.unhide(stage.canvas)
            break
        case scene_edit_cage:
            main_stage.change(dom.q('.main-stage#stage-edit-cage')!)
            main_stage.unhide(stage.canvas)
            break
        case scene_shop:
            main_stage.change(dom.q('.main-stage#stage-shop')!)
            main_stage.unhide(stage.canvas)
            break
        case scene_lobby:
            main_stage.change(dom.q('.main-stage#stage-lobby')!)
            main_stage.unhide(stage.canvas)
            break
        default:
            break
    }
})
