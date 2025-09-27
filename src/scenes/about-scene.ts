import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { GameScreen } from "@/game-screen"
import { Language } from "@/language"
import { SettingsScene } from "./settings-scene"
import { links } from "@/constants"

export class AboutScene extends Scene {
    private readonly githubButton: Button = new Button("github-button", () => window.open(links.github), GameScreen.getWidth / 2 - 64 - 4, 70, 64, 64)
    private readonly telegramButton: Button = new Button("telegram-button", () => window.open(links.telegram), GameScreen.getWidth / 2 + 4, 70, 64, 64)

    private readonly homeButton: Button = new Button("home-button", () => this.stop(new SettingsScene()), GameScreen.getWidth / 2 - 32, GameScreen.getHeight - 160, 64, 64)

    public init(): void {}

    public update(currentTime: number): void {
        this.githubButton.update(currentTime)
        this.telegramButton.update(currentTime)

        this.homeButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(Language.getText("developer"), GameScreen.getWidth / 2, 8, 32, "center")
        GameScreen.print("NEkTARIN (raro4ka)", GameScreen.getWidth / 2, 40, 24, "center")

        this.githubButton.draw(currentTime)
        this.telegramButton.draw(currentTime)

        this.homeButton.draw(currentTime)
    }
}
