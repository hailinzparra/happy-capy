interface CoreDOM {
    q: ParentNode['querySelector']
    qa: ParentNode['querySelectorAll']
    hide(el: HTMLElement): void
    show(el: HTMLElement, display_value?: string): void
    is_hidden(el: HTMLElement): boolean
    has_class(el: Element, class_name: string): boolean
    add_class(el: Element, ...class_names: string[]): void
    remove_class(el: Element, ...class_names: string[]): void
    toggle_class(el: Element, class_name: string): void
}

core.dom = {
    q(s: string) {
        return document.querySelector(s)
    },
    qa(s: string) {
        return document.querySelectorAll(s)
    },
    hide(el) {
        el.style.display = 'none'
    },
    show(el, display_value = '') {
        el.style.display = display_value
    },
    is_hidden(el): boolean {
        return el.style.display === 'none'
    },
    has_class(el, class_name: string) {
        return el.classList.contains(class_name)
    },
    add_class(el, ...class_names: string[]) {
        for (const name of class_names) {
            if (!el.classList.contains(name)) el.classList.add(name)
        }
    },
    remove_class(el, ...class_names: string[]) {
        for (const name of class_names) {
            if (el.classList.contains(name)) el.classList.remove(name)
        }
    },
    toggle_class(el, class_name: string) {
        el.classList.toggle(class_name)
    },
}
