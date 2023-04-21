interface CoreCommon {
    randbool(t?: number): boolean
    pick<T>(array: T[]): T
    randpop<T>(array: T[]): T
    shuffle(array: any[]): void
}

core.common = {
    randbool(t = 0.5) {
        return Math.random() < t
    },
    pick(array) {
        return array[core.math.irange(array.length)]
    },
    randpop(array) {
        return array.splice(core.math.irange(array.length), 1)[0]
    },
    shuffle(array) {
        for (let i = 0; i < array.length; i++) {
            let rand_index = core.math.irange(i + 1, array.length)
            if (rand_index >= array.length) {
                rand_index -= array.length
            }
            let temp = array[rand_index]
            array[rand_index] = array[i]
            array[i] = temp
        }
        return array
    },
}
