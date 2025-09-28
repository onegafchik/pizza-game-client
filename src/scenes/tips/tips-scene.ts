import tipsListJSON from "@/config/tips-list.json"

import { GameScreen } from "@/game-screen"
import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { MenuScene } from "../menu-scene"
import type { TipJSON } from "@/types"
import { Tip } from "./widgets/tip"

export class TipsScene extends Scene {
    private tipsList: Tip[]
    private currentTipIndex: number = 0

    private readonly leftButton: Button = new Button("left-button", () => this.left(), 0, 156, 24, 64)
    private readonly rightButton: Button = new Button("right-button", () => this.right(), GameScreen.getWidth - 24, 156, 24, 64)

    private readonly homeButton: Button = new Button("home-button", () => this.stop(new MenuScene()), GameScreen.getWidth / 2 - 32, GameScreen.getHeight - 160, 64, 64)

    public constructor() {
        super()

        this.tipsList = tipsListJSON.map((tip: TipJSON) => new Tip(tip))
    }

    public init(): void {}

    public update(currentTime: number): void {
        this.leftButton.update(currentTime)
        this.rightButton.update(currentTime)

        this.homeButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("background-without-sign", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.tipsList[this.currentTipIndex].draw(currentTime)

        this.leftButton.draw(currentTime)
        this.rightButton.draw(currentTime)

        this.homeButton.draw(currentTime)
    }

    private left(): void {
        this.currentTipIndex - 1 < 0 ? (this.currentTipIndex = this.tipsList.length - 1) : (this.currentTipIndex -= 1)
    }

    private right(): void {
        this.currentTipIndex + 1 > this.tipsList.length - 1 ? (this.currentTipIndex = 0) : (this.currentTipIndex += 1)
    }
}
