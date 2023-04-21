const main_stage = {
    get_list() {
        return document.querySelectorAll('.main-stage')
    },
    unhide(el: Element) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden')
        }
    },
    hide_all() {
        this.get_list().forEach(el => {
            if (!el.classList.contains('hidden')) {
                el.classList.add('hidden')
            }
        })
    },
    change(el: Element) {
        this.hide_all()
        this.unhide(el)
    }
}

events.on('core_scene_change_scene', ev => {
    console.log(ev.current_scene.name)
})
