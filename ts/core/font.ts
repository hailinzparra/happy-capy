interface CoreFontManager {
    xs: CoreFont
    s: CoreFont
    sm: CoreFont
    m: CoreFont
    l: CoreFont
    xl: CoreFont
    xxl: CoreFont
}

class CoreFont {
    size: number
    style: '' | 'bold' | 'italic' | 'bold italic'
    family: string
    constructor(size: number, style: CoreFont['style'], family: string) {
        this.size = size
        this.style = style
        this.family = family
    }
    bold() {
        return new CoreFont(this.size, 'bold', this.family)
    }
    italic() {
        return new CoreFont(this.size, 'italic', this.family)
    }
    bold_italic() {
        return new CoreFont(this.size, 'bold italic', this.family)
    }
    set_family(new_family: string) {
        this.family = new_family
        return this
    }
    reset_family() {
        this.family = G_CORE_FONT_DEFAULT_FAMILY
    }
}

core.font = {
    xs: new CoreFont(12, '', G_CORE_FONT_DEFAULT_FAMILY),
    s: new CoreFont(18, '', G_CORE_FONT_DEFAULT_FAMILY),
    sm: new CoreFont(24, '', G_CORE_FONT_DEFAULT_FAMILY),
    m: new CoreFont(36, '', G_CORE_FONT_DEFAULT_FAMILY),
    l: new CoreFont(48, '', G_CORE_FONT_DEFAULT_FAMILY),
    xl: new CoreFont(64, '', G_CORE_FONT_DEFAULT_FAMILY),
    xxl: new CoreFont(96, '', G_CORE_FONT_DEFAULT_FAMILY),
}
