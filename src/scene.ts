import { GameScreen } from "./game-screen"

export class Scene {
    private isWorking: boolean = false
    private nextScene?: Scene

    public constructor() {}

    public get getIsWorking(): boolean {
        return this.isWorking
    }

    public get getNextScene(): Scene {
        return this.nextScene ?? new EmptyScene()
    }

    public run(): void {
        this.isWorking = true
    }

    public stop(nextScene: Scene): void {
        this.isWorking = false
        this.nextScene = nextScene
    }

    public init(): void {}

    // @ts-ignore
    public update(currentTime: number): void {}

    // @ts-ignore
    public draw(currentTime: number): void {}
}

export class EmptyScene extends Scene {
    public update(): void {
        if (GameScreen.getCursorIsClicked) {
            window.location.reload()
        }
    }

    public draw(): void {
        GameScreen.setCurrentColor = "#000000"
        GameScreen.fill(0, 0, GameScreen.getWidth, GameScreen.getHeight)
        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print("Empty scene, click for reload app", GameScreen.getWidth / 2, GameScreen.getHeight / 2, 40, "center")
    }
}
