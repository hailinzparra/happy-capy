interface CoreMath {
    degtorad(deg: number): number
    radtodeg(rad: number): number
    clamp(value: number, min: number, max: number): number
    range(min: number, max?: number, t?: number): number
    irange(min: number, max?: number): number
    randneg(t?: number): number
    randbool(t?: number): boolean
}

core.math = {
    degtorad(deg) {
        return deg * G_CORE_MATH_DEG_TO_RAD
    },
    radtodeg(rad) {
        return rad * G_CORE_MATH_RAD_TO_DEG
    },
    clamp(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
    },
    range(min, max = 0, t = Math.random()) {
        return min + t * (max - min)
    },
    irange(min, max = 0) {
        return Math.floor(min + Math.random() * (max - min))
    },
    randneg(t = 0.5) {
        return Math.random() < t ? -1 : 1
    },
    randbool(t = 0.5) {
        return Math.random() < t
    },
}
