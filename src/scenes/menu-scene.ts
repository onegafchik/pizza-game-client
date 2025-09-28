import { EmptyScene, Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { ShopScene } from "./shop/shop-scene"
import { GameScreen } from "@/game-screen"
import { SettingsScene } from "./settings-scene"
import { LeaderboardScene } from "./leaderboard-scene"
import { LevelScene } from "./level/level-scene"
import { getShortScore } from "@/utils"
import { GlobalStorage } from "@/global-storage"
import { Language } from "@/language"
import { ButtonsRow } from "@/widgets/buttons-row"
import { TipsScene } from "./tips/tips-scene"

export class MenuScene extends Scene {
    private readonly shopButton: Button = new Button("shop-button", () => this.stop(new ShopScene()), 8, GameScreen.getHeight - 160, 64, 64)

    private readonly topButtonsRow: ButtonsRow = new ButtonsRow(
        [
            ["question-button", () => this.stop(new TipsScene())],
            ["leaderboard-button", () => this.stop(new LeaderboardScene())],
            ["settings-button", () => this.stop(new SettingsScene())]
        ],
        GameScreen.getWidth - 48,
        0,
        0,
        32
    )

    private readonly startLevelClickableArea: Button = new Button("", () => this.getNextScene instanceof EmptyScene && this.stop(new LevelScene()), 0, 0, GameScreen.getWidth, GameScreen.getHeight)

    public init(): void {
        GameScreen.getCursorIsPressed && (this.startLevelClickableArea.setIsEnable = false)
    }

    public update(currentTime: number): void {
        this.shopButton.update(currentTime)
        this.topButtonsRow.update(currentTime)

        this.startLevelClickableArea.update(currentTime)
        if (!this.startLevelClickableArea.getIsEnable && !GameScreen.getCursorIsPressed) this.startLevelClickableArea.setIsEnable = true
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.drawImage("trophy", 0, 0, 32, 32)
        GameScreen.print(getShortScore(GlobalStorage.getHighScore), 32, 0, 32)
        GameScreen.drawImage("money", 0, 24, 32, 32)
        GameScreen.print(GlobalStorage.getMoney.toString(), 32, 24, 32)

        this.shopButton.draw(currentTime)
        this.topButtonsRow.draw(currentTime)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(Language.getText("click"), GameScreen.getWidth / 2, GameScreen.getHeight / 2 - 56, 40, "center")
    }
}
