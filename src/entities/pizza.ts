import { oxidizedPizzaNamesList } from "@/constants"
import { Loot } from "./loot"
import { GameScreen } from "@/game-screen"
import type { PizzaName } from "@/types"

export class Pizza extends Loot {
    private readonly name: PizzaName

    private readonly isOxidized: boolean

    public constructor(name: PizzaName, x: number, y: number, isCrystal: boolean = false) {
        super(isCrystal ? "crystal-pizza" : "pizza", x, y)

        this.name = name
        this.isOxidized = new Set(oxidizedPizzaNamesList).has(name)
    }

    public get getName(): PizzaName {
        return this.name
    }

    public get getIsOxidized(): boolean {
        return this.isOxidized
    }

    public draw(_: number, oxidizedStage: number = 0): void {
        GameScreen.drawImage(`${this.name}-pizza${(this, this.isOxidized ? `-stage-${oxidizedStage}` : "")}`, this.getX, this.getY, this.getWidth, this.getHeight)
    }
}
