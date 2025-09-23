import { Timer } from "./timer"

export class SpriteAnimation {
    private readonly timer: Timer

    private readonly framesList: number[]
    private currentFrame: number = 0

    public constructor(duration: number, framesList: number[]) {
        this.framesList = framesList
        this.timer = new Timer(duration, () => this.nextFrame(), true)
    }

    public get getIsWorking(): boolean {
        return this.timer.getIsWorking
    }

    public get getDuration(): number {
        return this.timer.getDuration
    }

    public get getFramesCount(): number {
        return this.framesList.length
    }

    public get getCurrentFrame(): number {
        return this.framesList[this.currentFrame] ?? 0
    }

    public set setDuration(duration: number) {
        this.timer.setDuration = duration
    }

    public run(): void {
        this.timer.run()
    }

    public stop(): void {
        this.timer.stop()
    }

    public reset(): void {
        this.currentFrame = 0
    }

    public update(currentTime: number): void {
        this.timer.update(currentTime)
    }

    private nextFrame(): void {
        this.currentFrame >= this.framesList.length - 1 ? (this.currentFrame = 0) : (this.currentFrame += 1)
    }
}
