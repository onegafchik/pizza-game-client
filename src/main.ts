import { GameScreen } from "./game-screen"
import type { Scene } from "./scene"
import { LoadingScene } from "./scenes/loading-scene"
import { Timer } from "./timer"

export class Game {
    private static readonly version: string = "1.8.2"

    private static loopID?: number

    private static framesCount: number = 0
    private static framesPerSecond: number = 0
    private static readonly isShowFrameDataInConsole: boolean = !true
    private static readonly timerForUpdateFrameData: Timer = new Timer(1000, () => Game.updateFrameData(), true)

    private static currentScene: Scene = new LoadingScene()

    private constructor() {}

    public static get getVersion(): string {
        return Game.version
    }

    public static run(): void {
        GameScreen.init()

        Game.loopID = window.requestAnimationFrame((time: number) => Game.frame(time))

        Game.timerForUpdateFrameData.run()

        Game.currentScene.init()
        Game.currentScene.run()
    }

    public static stop(): void {
        Game.loopID && window.cancelAnimationFrame(Game.loopID)
    }

    private static frame(currentTime: number): void {
        Game.loopID = window.requestAnimationFrame((time: number) => Game.frame(time))

        Game.framesCount += 1

        if (!Game.currentScene.getIsWorking) {
            Game.currentScene = Game.currentScene.getNextScene
            Game.currentScene.init()
            Game.currentScene.run()
        }

        Game.currentScene.update(currentTime)

        Game.timerForUpdateFrameData.update(currentTime)

        GameScreen.clear()
        Game.currentScene.draw(currentTime)

        GameScreen.updateCursor()

        // !window.navigator.onLine && GameScreen.drawImage("no-wifi", 0, GameScreen.getHeight - 32, 32, 32)
    }

    private static updateFrameData(): void {
        Game.framesPerSecond = Game.framesCount
        Game.framesCount = 0

        Game.isShowFrameDataInConsole && console.log(`FPS: ${Game.framesPerSecond}`)
    }
}
