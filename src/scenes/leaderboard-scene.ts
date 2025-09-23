import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { MenuScene } from "./menu-scene"
import { GameScreen } from "@/game-screen"

export class LeaderboardScene extends Scene {
    private readonly homeButton: Button = new Button("home-button", () => this.stop(new MenuScene()), GameScreen.getWidth / 2 - 32, GameScreen.getHeight - 160, 64, 64)

    public init(): void {}

    public update(currentTime: number): void {
        this.homeButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)
        GameScreen.drawImage("leaderboard-locked-background", 20, 24, 216, 320)

        this.homeButton.draw(currentTime)
    }
}
