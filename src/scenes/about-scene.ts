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

    private readonly testersPositionY: number = 160

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
        GameScreen.print("NEkTARIN (raro4ka)", GameScreen.getWidth / 2, 36, 24, "center")

        this.githubButton.draw(currentTime)
        this.telegramButton.draw(currentTime)

        GameScreen.print(Language.getText("testers"), GameScreen.getWidth / 2, 160, 32, "center")

        GameScreen.drawImage("group-line", 24, this.testersPositionY - 16, 208, 12)

        GameScreen.print("F1stashka", GameScreen.getWidth / 3, this.testersPositionY + 30, 24, "center")
        GameScreen.print("SATANik", GameScreen.getWidth / 3, this.testersPositionY + 50, 24, "center")
        GameScreen.print("Tima", GameScreen.getWidth / 3, this.testersPositionY + 70, 24, "center")
        GameScreen.print("fomousey", (GameScreen.getWidth / 3) * 2, this.testersPositionY + 30, 24, "center")
        GameScreen.print("danik", (GameScreen.getWidth / 3) * 2, this.testersPositionY + 50, 24, "center")
        GameScreen.print("Tim4ek78", (GameScreen.getWidth / 3) * 2, this.testersPositionY + 70, 24, "center")

        this.homeButton.draw(currentTime)
    }
}
