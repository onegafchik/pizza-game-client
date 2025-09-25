import { GameScreen } from "@/game-screen"
import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { MenuScene } from "./menu-scene"
import { ChangeLanguageScene } from "./change-language-scene"
import { ChangeControlsScene } from "./change-controls-scene"
import { AboutScene } from "./about-scene"
import { Language } from "@/language"
import { Vector } from "@/vector"
import { links } from "@/constants"
import { Game } from "@/main"

export class SettingsScene extends Scene {
    private readonly buttonGroupPosition: Vector = new Vector(GameScreen.getWidth / 2 - 32, GameScreen.getHeight / 2 - 120)

    private readonly changeLanguageButton: Button = new Button("language-button", () => this.stop(new ChangeLanguageScene()), this.buttonGroupPosition.getX - 72, this.buttonGroupPosition.getY, 64, 64)
    private readonly homeButton: Button = new Button("home-button", () => this.stop(new MenuScene()), this.buttonGroupPosition.getX, this.buttonGroupPosition.getY, 64, 64)
    private readonly toggleFullscreenButton: Button = new Button("enable-fullscreen-button", () => this.toggleFullscreen(), this.buttonGroupPosition.getX + 72, this.buttonGroupPosition.getY, 64, 64)
    private readonly changeControlsButton: Button = new Button("controls-button", () => this.stop(new ChangeControlsScene()), this.buttonGroupPosition.getX - 72, this.buttonGroupPosition.getY + 72, 64, 64)
    private readonly aboutButton: Button = new Button("about-button", () => this.stop(new AboutScene()), this.buttonGroupPosition.getX, this.buttonGroupPosition.getY + 72, 64, 64)
    private readonly exitFromAccountButton: Button = new Button("exit-locked-button", () => this.exitFromAccount(), this.buttonGroupPosition.getX + 72, this.buttonGroupPosition.getY + 72, 64, 64)

    private readonly linkButtonGroupPosition: Vector = this.buttonGroupPosition.clone().add(0, 164)

    private readonly telegramButton: Button = new Button("telegram-button", () => links.stickersTelegram && window.open(links.stickersTelegram), this.linkButtonGroupPosition.getX - 36, this.linkButtonGroupPosition.getY, 64, 64)
    private readonly newsButton: Button = new Button("news-button", () => links.devblog && window.open(links.devblog), this.linkButtonGroupPosition.getX + 36, this.linkButtonGroupPosition.getY, 64, 64)

    public init(): void {}

    public update(currentTime: number): void {
        this.changeLanguageButton.update(currentTime)
        this.homeButton.update(currentTime)
        this.toggleFullscreenButton.update(currentTime)
        this.changeControlsButton.update(currentTime)
        this.aboutButton.update(currentTime)
        this.exitFromAccountButton.update(currentTime)

        this.telegramButton.update(currentTime)
        this.newsButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.changeLanguageButton.draw(currentTime)
        this.homeButton.draw(currentTime)

        this.toggleFullscreenButton.setImageName = `${document.fullscreenElement ? "disable" : "enable"}-fullscreen-button`
        this.toggleFullscreenButton.draw(currentTime)

        this.changeControlsButton.draw(currentTime)
        this.aboutButton.draw(currentTime)
        this.exitFromAccountButton.draw(currentTime)

        GameScreen.drawImage("group-line", this.changeControlsButton.getX, this.changeControlsButton.getY + 64 + 8, 208, 12)

        this.telegramButton.draw(currentTime)
        this.newsButton.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(Language.getText("stickers"), this.telegramButton.getX + this.telegramButton.getWidth / 2, this.telegramButton.getY + this.telegramButton.getHeight - 4, 24, "center")
        GameScreen.print(Language.getText("devblog"), this.newsButton.getX + this.newsButton.getWidth / 2, this.newsButton.getY + this.newsButton.getHeight - 4, 24, "center")

        GameScreen.print(`${Language.getText("version")} ${Game.getVersion}`, 4, GameScreen.getHeight - 20, 16)
    }

    private toggleFullscreen(): void {
        document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    }

    private exitFromAccount(): void {
        // const result: boolean = window.confirm(Language.getText("exit from account"))
    }
}
