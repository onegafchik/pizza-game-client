import { Entity } from "@/entity"
import { GameScreen } from "@/game-screen"

export type LootType = "pizza" | "rotten-pizza" | "ice" | "x-bonus" | "big-money" | "totem" | "crystal-pizza"

export class Loot extends Entity {
    private readonly type: LootType

    public constructor(type: LootType, x: number, y: number) {
        super(x, y, 64, 64)

        this.type = type
    }

    public get getType(): LootType {
        return this.type
    }

    public update(currentTime: number): void {
        super.update(currentTime)

        this.getVelocity.set(0, 300)
    }

    public draw(_: number): void {
        GameScreen.drawImage(this.type, this.getX, this.getY, this.getWidth, this.getHeight)
    }
}
