interface CoreMath {
    hypot(a: number, b: number): number
    degtorad(deg: number): number
    radtodeg(rad: number): number
    clamp(value: number, min: number, max: number): number
    range(min: number, max?: number, t?: number): number
    irange(min: number, max?: number): number
    randneg(t?: number): number
    distance(x1: number, y1: number, x2: number, y2: number): number
    seed: number
    seeded_random(): number
}

core.math = {
    hypot(a, b) {
        return Math.sqrt(a * a + b * b)
    },
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
    distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1)
    },
    seed: 0,
    seeded_random() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        this.seed = (this.seed * 9301 + 49297) % 233280
        return this.seed / 233280
    },
}
