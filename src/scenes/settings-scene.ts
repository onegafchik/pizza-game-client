import { GameScreen } from "@/game-screen"
import { Scene } from "@/scene"
import { MenuScene } from "./menu-scene"
import { ChangeLanguageScene } from "./change-language-scene"
import { ChangeControlsScene } from "./change-controls-scene"
import { AboutScene } from "./about-scene"
import { Language } from "@/language"
import { links } from "@/constants"
import { Game } from "@/main"
import { ButtonsRow } from "@/widgets/buttons-row"
import type { Button } from "@/widgets/button"

export class SettingsScene extends Scene {
    private readonly firstButtonsRow: ButtonsRow = new ButtonsRow(
        [
            ["language-button", () => this.stop(new ChangeLanguageScene())],
            ["home-button", () => this.stop(new MenuScene())],
            ["enable-fullscreen-button", () => this.toggleFullscreen()]
        ],
        GameScreen.getWidth / 2,
        GameScreen.getHeight / 2 - 120,
        4,
        64
    )
    private readonly secondButtonsRow: ButtonsRow = new ButtonsRow(
        [
            ["controls-button", () => this.stop(new ChangeControlsScene())],
            ["about-button", () => this.stop(new AboutScene())],
            ["exit-locked-button", () => null]
        ],
        GameScreen.getWidth / 2,
        GameScreen.getHeight / 2 - 48,
        4,
        64
    )

    private readonly linkTitlesList: string[] = ["stickers", "devblog", "promo"]
    private readonly linkButtonsRow: ButtonsRow = new ButtonsRow(
        [
            ["telegram-button", () => links.stickersTelegram && window.open(links.stickersTelegram)],
            ["news-button", () => links.devblog && window.open(links.devblog)],
            ["youtube-locked-button", () => null]
        ],
        GameScreen.getWidth / 2,
        GameScreen.getHeight / 2 + 44,
        4,
        64
    )

    public init(): void {}

    public update(currentTime: number): void {
        this.firstButtonsRow.update(currentTime)
        this.secondButtonsRow.update(currentTime)

        this.linkButtonsRow.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.firstButtonsRow.getButtonsList[2].setImageName = `${document.fullscreenElement ? "disable" : "enable"}-fullscreen-button`
        this.firstButtonsRow.draw(currentTime)
        this.secondButtonsRow.draw(currentTime)

        GameScreen.drawImage("group-line", 24, this.secondButtonsRow.getY + 72, 208, 12)

        this.linkButtonsRow.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        this.linkButtonsRow.getButtonsList.forEach((button: Button, index: number) => GameScreen.print(Language.getText(this.linkTitlesList[index]), button.getX + 32, button.getY + 60, 24, "center"))

        GameScreen.print(`${Language.getText("version")} ${Game.getVersion}`, 4, GameScreen.getHeight - 20, 16)
    }

    private toggleFullscreen(): void {
        document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    }
}
