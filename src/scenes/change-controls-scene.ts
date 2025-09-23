import { GameScreen } from "@/game-screen"
import { GlobalStorage } from "@/global-storage"
import { Language } from "@/language"
import { Scene } from "@/scene"
import type { ControlsType } from "@/types"
import { Button } from "@/widgets/button"
import { MenuScene } from "./menu-scene"

export class ChangeControlsScene extends Scene {
    private readonly halfScreenButton: Button = new Button("half-screen-button", () => this.changeControls("half-screen"), 16, 152, 92, 164)
    private readonly behindFingerButton: Button = new Button("behind-finger-button", () => this.changeControls("behind-finger"), GameScreen.getWidth - 16 - 92, 152, 92, 164)

    public init(): void {}

    public update(currentTime: number): void {
        this.halfScreenButton.update(currentTime)
        this.behindFingerButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.halfScreenButton.draw(currentTime)
        this.behindFingerButton.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(Language.getText("change controls"), GameScreen.getWidth / 2, 100, 32, "center")
    }

    private changeControls(type: ControlsType): void {
        GlobalStorage.setControlsType = type

        this.stop(new MenuScene())
    }
}
