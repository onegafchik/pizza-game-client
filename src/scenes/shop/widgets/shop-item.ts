import { Button } from "@/widgets/button"
import type { PizzaCard } from "./pizza-card"
import { GameScreen } from "@/game-screen"
import { GlobalStorage } from "@/global-storage"
import type { PizzaName } from "@/types"

export class ShopItem extends Button {
    private readonly pizzaName: PizzaName
    private readonly pizzaCard: PizzaCard

    constructor(pizzaName: PizzaName, pizzaCard: PizzaCard, callback: Function, x: number, y: number) {
        super(`${pizzaName}-pizza`, () => callback(this.pizzaCard), x, y, 64, 64)

        this.pizzaName = pizzaName
        this.pizzaCard = pizzaCard
    }

    public get getPizzaName(): PizzaName {
        return this.pizzaName
    }

    public get getPizzaCard(): PizzaCard {
        return this.pizzaCard
    }

    public draw(currentTime: number): void {
        super.draw(currentTime)

        !GlobalStorage.hasPizza(this.pizzaName) && GameScreen.drawImage("locked-pizza", this.getX, this.getY, this.getWidth, this.getHeight)
        GlobalStorage.getIsLikedPizza(this.pizzaName) && GameScreen.drawImage("liked-pizza", this.getX, this.getY, this.getWidth, this.getHeight)
    }
}
