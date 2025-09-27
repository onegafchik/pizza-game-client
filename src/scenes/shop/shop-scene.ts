import pizzasListJSON from "@/config/pizzas-list.json"

import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { GameScreen } from "@/game-screen"
import { MenuScene } from "../menu-scene"
import { GlobalStorage } from "@/global-storage"
import { Language } from "@/language"
import { ShopItem } from "./widgets/shop-item"
import { PizzaCard } from "./widgets/pizza-card"
import type { PizzaJSON } from "@/types"

export class ShopScene extends Scene {
    private itemsList: ShopItem[] = []

    private readonly rowsCount: number
    private currentRowIndex: number = 0

    private currentRow: [ShopItem?, ShopItem?, ShopItem?] = []
    private currentPizzaCard?: PizzaCard

    private readonly homeButton: Button = new Button("home-button", () => this.stop(new MenuScene()), GameScreen.getWidth - 64 - 8, 8, 64, 64)

    private readonly leftButton: Button = new Button("left-button", () => this.left(), 0, GameScreen.getHeight - 160, 24, 64)
    private readonly rightButton: Button = new Button("right-button", () => this.right(), GameScreen.getWidth - 24, GameScreen.getHeight - 160, 24, 64)

    private readonly randomModeCheckbox: Button = new Button("disable-checkbox-button", () => GlobalStorage.toggleRandomMode(), 8, GameScreen.getHeight - 40, 32, 32)

    public constructor() {
        super()

        this.itemsList = pizzasListJSON.map((pizza: PizzaJSON, index: number) => {
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

    public init(): void {
        !GlobalStorage.getIsMoreThanTwoPizzas && this.randomModeCheckbox.hide()
    }

    public update(currentTime: number): void {
        this.homeButton.update(currentTime)

        this.randomModeCheckbox.update(currentTime)

        this.leftButton.update(currentTime)
        this.rightButton.update(currentTime)

        this.currentRow.forEach((item?: ShopItem) => item?.update(currentTime))
        this.currentPizzaCard?.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("shop-background", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.currentRow.forEach((item?: ShopItem) => item?.draw(currentTime))
        this.currentPizzaCard?.draw(currentTime)

        this.leftButton.draw(currentTime)
        this.rightButton.draw(currentTime)

        GameScreen.drawImage("money-background", 8, 8, 88, 32)
        GameScreen.drawImage("money", 8, 8, 32, 32)
        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(GlobalStorage.getMoney.toString(), 36, 7, 32)

        this.randomModeCheckbox.setImageName = `${GlobalStorage.getIsRandomModeEnabled ? "enable" : "disable"}-checkbox-button`
        this.randomModeCheckbox.draw(currentTime)
        GameScreen.setCurrentColor = "#ffffff"
        this.randomModeCheckbox.getIsVisible && GameScreen.print(Language.getText("random mode"), this.randomModeCheckbox.getX + 34, this.randomModeCheckbox.getY + 4, 24)

        this.homeButton.draw(currentTime)
    }

    private left(): void {
        this.currentRowIndex - 1 < 0 ? (this.currentRowIndex = this.rowsCount) : (this.currentRowIndex -= 1)
        this.updateRow()
    }

    private right(): void {
        this.currentRowIndex + 1 > this.rowsCount ? (this.currentRowIndex = 0) : (this.currentRowIndex += 1)
        this.updateRow()
    }

    private updateRow(): void {
        this.currentRow = [this.itemsList[this.currentRowIndex * 3], this.itemsList[this.currentRowIndex * 3 + 1], this.itemsList[this.currentRowIndex * 3 + 2]]
    }
}
