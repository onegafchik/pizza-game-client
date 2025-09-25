export class Timer {
    private isWorking: boolean = false
    private lastTime: number = 0
    private deltaTime: number = 0

    private duration: number
    private readonly callback: Function
    private isLooped: boolean

    public constructor(duration: number, callback: Function, isLooped: boolean = false) {
        this.duration = duration
        this.callback = callback
        this.isLooped = isLooped
    }

    public get getIsWorking(): boolean {
        return this.isWorking
    }

    public get getLastTime(): number {
        return this.lastTime
    }

    public get getDeltaTime(): number {
        return this.deltaTime
    }

    public get getDuration(): number {
        return this.duration
    }

    public get getIsLooped(): boolean {
        return this.isLooped
    }

    public set setDuration(duration: number) {
        this.duration = Math.max(0, duration)
    }

    public set setIsLooped(value: boolean) {
        this.isLooped = value
    }

    public run(): void {
        this.isWorking = true
        this.lastTime = 0
    }

    public stop(): void {
        this.isWorking = false
    }

    public update(currentTime: number): void {
        if (!this.isWorking) return

        this.lastTime === 0 && (this.lastTime = currentTime)
        this.deltaTime = currentTime - this.lastTime

        if (this.deltaTime >= this.duration) {
            this.isLooped ? this.run() : this.stop()
            this.callback()
        }
    }
}
