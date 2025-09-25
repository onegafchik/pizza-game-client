import { Entity } from "@/entity"
import { GameScreen } from "@/game-screen"
import { GlobalStorage } from "@/global-storage"
import { range } from "@/math"
import { Timer } from "@/timer"

export class Player extends Entity {
    private health: number = 3
    private isFrozen: boolean = false
    private isHasShield: boolean = false

    private isHasX: boolean = false
    private xLevel: number = 2
    private readonly maxXLevel: number = 5

    private isRotten: boolean = false
    private readonly rottenTimer: Timer = new Timer(3000, () => (this.isRotten = false))

    private readonly freezeTimer: Timer = new Timer(4000, () => this.melt())
    private readonly xTimer: Timer = new Timer(16000, () => this.disableX(), true)

    private readonly defaultSpeed: number = 400
    private speed: number = this.defaultSpeed

    private readonly iconsHash: Map<string, Timer> = new Map([
        ["x", this.xTimer],
        ["ice", this.freezeTimer]
    ])

    public constructor(x: number, y: number) {
        super(x, y, 64, 16)
    }

    public get getHealth(): number {
        return this.health
    }

    public get getIsFrozen(): boolean {
        return this.isFrozen
    }

    public get getIsHasShield(): boolean {
        return this.isHasShield
    }

    public get getIsHasX(): boolean {
        return this.isHasX
    }

    public get getXLevel(): number {
        return this.xLevel
    }

    public get getIsRotten(): boolean {
        return this.isRotten
    }

    public set setHealth(health: number) {
        this.health = Math.max(0, health)
    }

    public set setIsShield(value: boolean) {
        this.isHasShield = value
    }

    public freeze(): void {
        this.isFrozen = true
        this.speed = this.defaultSpeed / 3

        this.freezeTimer.run()
    }

    public melt(): void {
        this.isFrozen = false
        this.speed = this.defaultSpeed

        this.freezeTimer.stop()
    }

    public enableX(): void {
        if (this.isHasX) this.xLevel = Math.min(this.maxXLevel, this.xLevel + 1)
        else {
            this.isHasX = true
            this.xLevel = 2
        }

        this.xTimer.run()
    }

    public disableX(): void {
        this.xLevel -= 1

        if (this.xLevel < 2) {
            this.isHasX = false
            this.xTimer.stop()
        }
    }

    public hit(): void {
        if (this.isRotten) return

        if (this.isHasShield) {
            this.isHasShield = false
            return
        }

        this.health = Math.max(0, this.health - 1)

        this.isRotten = true
        this.rottenTimer.run()
    }

    public update(currentTime: number): void {
        super.update(currentTime)

        this.rottenTimer.update(currentTime)

        this.freezeTimer.update(currentTime)
        this.xTimer.update(currentTime)

        if (
            GameScreen.getIsKeyPressed("arrowleft") ||
            (GlobalStorage.getControlsType === "half-screen" && GameScreen.getCursorIsPressed && GameScreen.getIsCursorIntersectWithArea(0, 32, GameScreen.getWidth / 2, GameScreen.getHeight - 32)) ||
            (GlobalStorage.getControlsType === "behind-finger" && GameScreen.getCursorIsPressed && GameScreen.getIsCursorIntersectWithArea(0, 32, this.getX + this.getWidth / 2 - 4, GameScreen.getHeight - 32))
        ) {
            this.getVelocity.add(-this.speed, 0)
        }

        if (
            GameScreen.getIsKeyPressed("arrowright") ||
            (GlobalStorage.getControlsType === "half-screen" && GameScreen.getCursorIsPressed && GameScreen.getIsCursorIntersectWithArea(GameScreen.getWidth / 2, 32, GameScreen.getWidth / 2, GameScreen.getHeight - 32)) ||
            (GlobalStorage.getControlsType === "behind-finger" && GameScreen.getCursorIsPressed && GameScreen.getIsCursorIntersectWithArea(this.getX + this.getWidth / 2 + 4, 32, GameScreen.getWidth, GameScreen.getHeight - 32))
        ) {
            this.getVelocity.add(this.speed, 0)
        }

        if (this.getX <= 4) {
            this.setX = 4
        }

        if (this.getX + this.getWidth >= GameScreen.getWidth - 4) {
            this.setX = GameScreen.getWidth - this.getWidth - 4
        }
    }

    public draw(_: number): void {
        this.isRotten ? GameScreen.drawImage("rotten-box", this.getX - 4, this.getY - 48, 72, 72) : GameScreen.drawImage(this.isFrozen ? "ice-box" : "box", this.getX - 4, this.getY - 48, 72, 72)
    }

    public drawHUD(_: number): void {
        range(3).forEach((index: number) => GameScreen.drawImage("dead-heart", index * 24, 0, 32, 32))
        range(this.health).forEach((index: number) => GameScreen.drawImage(this.isHasShield ? "gold-heart" : "heart", index * 24, 0, 32, 32))

        Array.from(this.iconsHash)
            .filter(([_, timer]) => timer.getIsWorking)
            .forEach(([iconName, timer], index: number) => {
                const progress: number = Math.min(1, 1 - timer.getDeltaTime / timer.getDuration)

                GameScreen.drawImage(`${iconName}${iconName === "x" ? this.xLevel.toString() : ""}-icon`, 0, 96 + index * 48 + index * 4, 56, 48)
                GameScreen.drawSprite("icon-line", 0, 0, progress * 13, 1, 0, 136 + index * 48 + index * 4, progress * 52, 4)
            })
    }
}
