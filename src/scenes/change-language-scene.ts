import { GameScreen } from "@/game-screen"
import { Language } from "@/language"
import { Scene } from "@/scene"
import type { LanguageType } from "@/types"
import { Button } from "@/widgets/button"
import { MenuScene } from "./menu-scene"

export class ChangeLanguageScene extends Scene {
    private englishButton: Button = new Button("britain-flag", () => this.changeLanguage("english"), GameScreen.getWidth / 2 + 4, GameScreen.getHeight / 2 - 32, 64, 64)
    private russianButton: Button = new Button("russia-flag", () => this.changeLanguage("russian"), this.englishButton.getX - 64 - 8, this.englishButton.getY, 64, 64)

    private readonly changeText: string = Language.getText("change language")

    public init(): void {}

    public update(currentTime: number): void {
        this.englishButton.update(currentTime)
        this.russianButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.englishButton.draw(currentTime)
        this.russianButton.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(this.changeText, GameScreen.getWidth / 2, GameScreen.getHeight / 2 - 72, 32, "center")
    }

    private changeLanguage(language: LanguageType): void {
        Language.setCurrentLanguage = language
        localStorage.setItem("language", Language.getCurrentLanguage)

        this.stop(new MenuScene())
    }
}
