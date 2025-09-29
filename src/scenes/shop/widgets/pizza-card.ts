import { GameScreen } from "@/game-screen"
import { GlobalStorage } from "@/global-storage"
import type { PizzaName } from "@/types"
import { getShortScore } from "@/utils"
import { Widget } from "@/widget"
import { Button } from "@/widgets/button"
import { MultiLineText } from "@/widgets/multi-line-text"

export class PizzaCard extends Widget {
    private readonly pizzaName: PizzaName

    private readonly title: string
    private readonly description: MultiLineText
    private readonly cost: number

    private readonly isCrystal: boolean
    private readonly isOxidized: boolean

    private readonly buyButton: Button = new Button("", () => this.buy(), 12, 264, 72, 32)
    private readonly likeButton: Button = new Button(`enable-like-button`, () => this.toggleLikedPizza(), 20, 264, 56, 40)

    public constructor(pizzaName: PizzaName, title: string, descriptionText: string, cost: number, isCrystal: boolean = false, isOxidized: boolean = false) {
        super(0, 0, 0, 0)

        this.pizzaName = pizzaName
        this.title = title
        this.description = new MultiLineText(descriptionText, GameScreen.getWidth / 2 + 32, 96, 192, 30)
        this.cost = cost

        this.isCrystal = isCrystal
        this.isOxidized = isOxidized

        this.buyButton.hide()

        this.cost >= 0 && !GlobalStorage.hasPizza(this.pizzaName) && !this.isCrystal && this.buyButton.show()
        !GlobalStorage.hasPizza(this.pizzaName) && this.likeButton.hide()
    }

    public get getPizzaName(): PizzaName {
        return this.pizzaName
    }

    public get getTitle(): string {
        return this.title
    }

    public get getDescription(): string {
        return this.description.getText
    }

    public get getIsCrystal(): boolean {
        return this.isCrystal
    }

    public get getIsOxidized(): boolean {
        return this.isOxidized
    }

    public update(currentTime: number): void {
        super.update(currentTime)

        this.buyButton.update(currentTime)
        this.likeButton.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage(`${this.pizzaName}-pizza`, 16, 192, 64, 64)

        this.isCrystal && GameScreen.drawImage("crystal", 76, 175, 16, 16)
        this.isOxidized && GameScreen.drawImage("clocks", 78, 175, 16, 16)

        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(this.title, 96, 160, 40)
        this.description.draw(currentTime)

        if (this.buyButton.getIsEnable) {
            GameScreen.drawImage("small-money-background", 12, 264, 72, 32)
            GameScreen.drawImage("money", 12, 264, 32, 32)
            GameScreen.setCurrentColor = "#ffffff"
            GameScreen.print(getShortScore(this.cost), 40, 263, 32)
        } else {
            this.likeButton.setImageName = `${GlobalStorage.getIsLikedPizza(this.pizzaName) ? "enable" : "disable"}-like-button`
            this.likeButton.draw(currentTime)
        }
    }

    private buy(): void {
        if (GlobalStorage.buyPizza(this.pizzaName, this.cost)) {
            this.buyButton.hide()
            this.likeButton.show()
        }
    }

    private toggleLikedPizza(): void {
        GlobalStorage.getIsLikedPizza(this.pizzaName) ? GlobalStorage.unlikePizza(this.pizzaName) : GlobalStorage.likePizza(this.pizzaName)
    }
}
