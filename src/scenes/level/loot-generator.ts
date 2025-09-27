import { crystalPizzaNamesList, pizzasNamesList } from "@/constants"
import { Loot, type LootType } from "@/entities/loot"
import { Pizza } from "@/entities/pizza"
import { GlobalStorage } from "@/global-storage"
import { random } from "@/math"
import { Timer } from "@/timer"
import type { PizzaName } from "@/types"

export class LootGenerator {
    private readonly minDuration: number
    private readonly deltaDuration: number

    private readonly timer: Timer

    private lootList: Loot[] = []

    public constructor(firstDuration: number, minDuration: number, deltaDuration: number) {
        this.minDuration = minDuration
        this.deltaDuration = deltaDuration

        this.timer = new Timer(firstDuration, () => this.spawn(), true)
    }

    public get getLootList(): Loot[] {
        return this.lootList
    }

    public run(): void {
        this.timer.run()
    }

    public stop(): void {
        this.timer.stop()
    }

    public addLoot(newLoot: Loot): void {
        this.lootList = [...this.lootList, newLoot]
    }

    public removeLoot(lootCandidate: Loot): void {
        this.lootList = this.lootList.filter((loot: Loot) => loot !== lootCandidate)
    }

    public clearLootList(): void {
        this.lootList = []
    }

    public update(currentTime: number): void {
        this.timer.update(currentTime)
    }

    private spawn(): void {
        this.timer.getDuration > this.minDuration && (this.timer.setDuration = this.timer.getDuration - this.deltaDuration)

        const lootType: LootType = this.getRandomLootType()
        const x: number = random(0, 192)

        if (lootType === "pizza") this.lootList = [...this.lootList, new Pizza(GlobalStorage.getIsRandomModeEnabled ? this.getPizzaName(pizzasNamesList, false) : GlobalStorage.getChosenPizza, x, -64)]
        else if (lootType === "crystal-pizza") this.lootList = [...this.lootList, new Pizza(this.getPizzaName(crystalPizzaNamesList, true), x, -64, true)]
        else this.lootList = [...this.lootList, new Loot(lootType, x, -64)]
    }

    private getRandomLootType(): LootType {
        const percent: number = random(1, 1000)

        switch (true) {
            case percent <= 700:
                return "pizza"
            case percent > 700 && percent <= 900:
                return "rotten-pizza"
            case percent > 900 && percent <= 960:
                return "ice"
            case percent > 960 && percent <= 980:
                return "x-bonus"
            case percent > 980 && percent <= 990:
                return "big-money"
            case percent > 990 && percent <= 999:
                return "totem"
            case percent == 1000:
                if (crystalPizzaNamesList.every((pizzaName: string) => GlobalStorage.hasPizza(pizzaName))) return "totem"

                return "crystal-pizza"
            default: {
                return "pizza"
            }
        }
    }

    private getPizzaName(pizzaNamesList: PizzaName[], isBackward: boolean): PizzaName {
        let candidateNamesList: PizzaName[] = []
        let candidateName: PizzaName = "pepperoni"

        pizzaNamesList.forEach((pizzaName: string) => {
            if (GlobalStorage.hasPizza(pizzaName)) {
                !isBackward && (candidateNamesList = [...candidateNamesList, pizzaName])
            } else if (isBackward) {
                candidateNamesList = [...candidateNamesList, pizzaName]
            }
        })

        candidateNamesList.length > 0 && (candidateName = candidateNamesList[random(0, candidateNamesList.length - 1)])
        return candidateName
    }
}
