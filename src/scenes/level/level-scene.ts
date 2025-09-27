import { Player } from "@/entities/player"
import { Scene } from "@/scene"
import { LootGenerator } from "./loot-generator"
import { GameScreen } from "@/game-screen"
import { Timer } from "@/timer"
import { SpriteAnimation } from "@/animation"
import { Button } from "@/widgets/button"
import { Language } from "@/language"
import { GlobalStorage } from "@/global-storage"
import { MenuScene } from "../menu-scene"
import { Loot } from "@/entities/loot"
import { getShortScore } from "@/utils"
import { Pizza } from "@/entities/pizza"

export class LevelScene extends Scene {
    private isPause: boolean = false
    private bufferTime: number = 0
    private lastTime: number = 0

    private readonly player: Player = new Player(0, GameScreen.getHeight - 92)

    private readonly lootGenerator: LootGenerator = new LootGenerator(2000, 400, 40)

    private score: number = 0
    private readonly scoreTimer: Timer = new Timer(10, () => (this.score += 1), true)

    private oxidizedStage: number = 0
    private readonly maxOxidizedStage = 3
    private readonly oxidizedTimer: Timer = new Timer(100000, () => (this.oxidizedStage = Math.min(this.oxidizedStage + 1, this.maxOxidizedStage)), true)

    private readonly smellAnimation: SpriteAnimation = new SpriteAnimation(150, [0, 1, 2, 3])
    private readonly bigMoneyAnimation: SpriteAnimation = new SpriteAnimation(150, [0, 1, 2, 3, 4, 5, 6, 7])

    private readonly pauseButton: Button = new Button("pause-button", () => this.pause(), GameScreen.getWidth - 32, 0, 32, 32)
    private readonly continueButton: Button = new Button("continue-button", () => this.unpause(), GameScreen.getWidth / 2 - 64 - 8, GameScreen.getHeight / 2 - 32, 64, 64)
    private readonly homeButton: Button = new Button("home-button", () => this.exit(), GameScreen.getWidth / 2 + 8, GameScreen.getHeight / 2 - 32, 64, 64)

    public init(): void {
        this.player.setX = GameScreen.getWidth / 2 - this.player.getWidth / 2

        this.continueButton.hide()
        this.homeButton.hide()

        this.lootGenerator.run()

        this.scoreTimer.run()
        this.oxidizedTimer.run()

        this.smellAnimation.run()
        this.bigMoneyAnimation.run()
    }

    public update(currentTime: number): void {
        this.pauseButton.update(currentTime)
        this.continueButton.update(currentTime)
        this.homeButton.update(currentTime)

        if (this.isPause) {
            this.lastTime === 0 && (this.lastTime = currentTime)

            this.bufferTime += currentTime - this.lastTime
            this.lastTime = currentTime
        } else {
            GameScreen.getIsKeyPressed("space") && this.pause()

            this.scoreTimer.update(currentTime - this.bufferTime)
            this.oxidizedTimer.update(currentTime - this.bufferTime)

            this.lootGenerator.update(currentTime - this.bufferTime)
            this.lootGenerator.getLootList.forEach((loot: Loot) => {
                loot.update(currentTime - this.bufferTime)

                if (this.player.detectWithAnotherEntity(loot)) {
                    switch (loot.getType) {
                        case "pizza": {
                            this.player.getIsHasX ? GlobalStorage.addMoney(this.player.getXLevel) : GlobalStorage.addMoney(1)
                            break
                        }
                        case "rotten-pizza": {
                            this.player.getIsFrozen && this.player.melt()
                            this.player.hit()
                            break
                        }
                        case "ice": {
                            !this.player.getIsRotten && this.player.freeze()
                            break
                        }
                        case "x-bonus": {
                            this.player.enableX()
                            break
                        }
                        case "big-money": {
                            GlobalStorage.addMoney(100)
                            break
                        }
                        case "totem": {
                            this.player.getIsHasShield && GlobalStorage.addMoney(30)
                            this.player.setIsShield = true
                            break
                        }
                        case "crystal-pizza": {
                            if (!(loot instanceof Pizza)) return

                            GlobalStorage.addMoney(100)
                            GlobalStorage.buyPizza(loot.getName, 0)
                            break
                        }
                    }

                    this.lootGenerator.removeLoot(loot)
                } else if (loot.getY >= GameScreen.getHeight) {
                    this.lootGenerator.removeLoot(loot)
                }
            })

            this.player.update(currentTime - this.bufferTime)
            this.player.getHealth <= 0 && this.exit()
        }
    }

    public draw(currentTime: number): void {
        this.smellAnimation.update(currentTime)
        this.bigMoneyAnimation.update(currentTime)

        GameScreen.drawImage("background", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.player.draw(currentTime)
        this.player.getIsRotten && GameScreen.drawSprite("smell-animation", this.smellAnimation.getCurrentFrame * 16, 0, 16, 32, this.player.getX + 4, this.player.getY - 64, 64, 128)

        this.lootGenerator.getLootList.forEach((loot: Loot) => {
            loot instanceof Pizza ? loot.draw(currentTime, this.oxidizedStage) : loot.draw(currentTime)

            loot.getType === "rotten-pizza" && GameScreen.drawSprite("smell-animation", this.smellAnimation.getCurrentFrame * 16, 0, 16, 32, loot.getX, loot.getY - 48, 64, 128)
            loot.getType === "big-money" && GameScreen.drawSprite("big-money-animation", this.bigMoneyAnimation.getCurrentFrame * 16, 0, 16, 16, loot.getX, loot.getY, 64, 64)
        })

        this.player.drawHUD(currentTime)

        GameScreen.drawImage("trophy", 0, 24, 32, 32)
        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(GlobalStorage.getHighScore > this.score ? `${getShortScore(GlobalStorage.getHighScore)} / ${getShortScore(this.score)}` : getShortScore(this.score), 32, 24, 32)

        GameScreen.drawImage("money", 0, 48, 32, 32)
        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(GlobalStorage.getMoney.toString(), 32, 48, 32)

        if (this.isPause) {
            GameScreen.setCurrentColor = "#ffffff"
            GameScreen.print(Language.getText("pause"), GameScreen.getWidth / 2, GameScreen.getHeight / 2 - 80, 40, "center")
        }

        this.pauseButton.draw(currentTime)
        this.continueButton.draw(currentTime)
        this.homeButton.draw(currentTime)
    }

    private pause(): void {
        this.isPause = true

        this.pauseButton.hide()
        this.continueButton.show()
        this.homeButton.show()
    }

    private unpause(): void {
        this.isPause = false
        this.lastTime = 0

        this.pauseButton.show()
        this.continueButton.hide()
        this.homeButton.hide()
    }

    private exit(): void {
        this.score > GlobalStorage.getHighScore && GlobalStorage.updateHighScore(this.score)

        this.stop(new MenuScene())
    }
}
