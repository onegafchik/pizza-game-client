import { GameScreen } from "@/game-screen"
import { Language } from "@/language"
import { Scene } from "@/scene"
import type { LanguageType } from "@/types"
import { MenuScene } from "./menu-scene"
import { ButtonsRow } from "@/widgets/buttons-row"

export class ChangeLanguageScene extends Scene {
    private readonly buttonsRow: ButtonsRow = new ButtonsRow(
        [
            ["russia-flag", () => this.changeLanguage("russian")],
            ["britain-flag", () => this.changeLanguage("english")]
        ],
        GameScreen.getWidth / 2,
        GameScreen.getHeight / 2 - 32,
        4,
        64
    )

    public init(): void {}

    public update(currentTime: number): void {
        this.buttonsRow.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.buttonsRow.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print("Русский", this.buttonsRow.getButtonsList[0].getX + 32, this.buttonsRow.getButtonsList[0].getY + 60, 24, "center")
        GameScreen.print("English", this.buttonsRow.getButtonsList[1].getX + 32, this.buttonsRow.getButtonsList[1].getY + 60, 24, "center")
    }

    private changeLanguage(language: LanguageType): void {
        Language.setCurrentLanguage = language

        this.stop(new MenuScene())
    }
}
