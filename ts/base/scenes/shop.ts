interface SceneShopProps {
    back_button: HTMLElement
}

const scene_shop = new CoreScene<SceneShopProps>('Shop', {
    back_button: dom.q('#shop-back-button')!,
})

scene_shop.props.back_button.onclick = () => {
    scene.change_scene(scene_ranch)
}
