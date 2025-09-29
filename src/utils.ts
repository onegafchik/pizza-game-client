export function getShortScore(score: number): string {
    return score >= 1000 ? `${Math.trunc(score / 1000)}.${score.toString()[score.toString().length - 3]}k` : score.toFixed()
}

export function getNumberFromLocalStorage(key: string): number {
    const data: number = Number(localStorage.getItem(key))
    return Number.isFinite(data) ? data : 0
}
