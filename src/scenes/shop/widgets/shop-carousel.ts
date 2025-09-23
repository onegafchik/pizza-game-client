import type { PizzaJSON } from "@/types"
import { ShopItem } from "./shop-item"
import { PizzaCard } from "./pizza-card"
import { Language } from "@/language"
import { GameScreen } from "@/game-screen"
import { Widget } from "@/widget"

export class ShopCarousel extends Widget {
    private itemsList: ShopItem[] = []

    private readonly rowsCount: number
    private currentRowIndex: number = 0

    private currentRow: [ShopItem?, ShopItem?, ShopItem?] = []
    private currentPizzaCard?: PizzaCard

    public constructor(candidate: PizzaJSON[]) {
        super(0, 0, 0, 0)

        this.itemsList = candidate.map((pizza: PizzaJSON, index: number) => {
            return new ShopItem(
                pizza.name,
                new PizzaCard(pizza.name, pizza.title[Language.getCurrentLanguage], pizza.description[Language.getCurrentLanguage], pizza.cost, pizza.crystal, pizza.oxidized),
                (card: PizzaCard) => (this.currentPizzaCard = card),
                28 + Math.floor(index % 3) * 64 + Math.floor(index % 3) * 4,
                GameScreen.getHeight - 160
            )
        })

        this.currentPizzaCard = this.itemsList[0].getPizzaCard

        this.rowsCount = Math.floor((this.itemsList.length - 1) / 3)
        this.updateRow()
    }

    public left(): void {
        this.currentRowIndex - 1 < 0 ? (this.currentRowIndex = this.rowsCount) : (this.currentRowIndex -= 1)
        this.updateRow()
    }

    public right(): void {
        this.currentRowIndex + 1 > this.rowsCount ? (this.currentRowIndex = 0) : (this.currentRowIndex += 1)
        this.updateRow()
    }

    public update(currentTime: number): void {
        this.currentRow.forEach((item?: ShopItem) => item?.update(currentTime))
        this.currentPizzaCard?.update(currentTime)
    }

    public draw(currentTime: number): void {
        this.currentRow.forEach((item?: ShopItem) => item?.draw(currentTime))
        this.currentPizzaCard?.draw(currentTime)
    }

    private updateRow(): void {
        this.currentRow = [this.itemsList[this.currentRowIndex * 3], this.itemsList[this.currentRowIndex * 3 + 1], this.itemsList[this.currentRowIndex * 3 + 2]]
    }
}
