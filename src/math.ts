export function random(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
}

export function range(size: number): number[] {
    return Array.from(new Array(size).keys())
}
