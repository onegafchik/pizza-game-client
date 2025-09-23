import pizzasListJSON from "@/config/pizzas-list.json"

import { Scene } from "@/scene"
import { Button } from "@/widgets/button"
import { GameScreen } from "@/game-screen"
import { MenuScene } from "../menu-scene"
import { ShopCarousel } from "./widgets/shop-carousel"
import { GlobalStorage } from "@/global-storage"
import { Language } from "@/language"

export class ShopScene extends Scene {
    private readonly homeButton: Button = new Button("home-button", () => this.stop(new MenuScene()), GameScreen.getWidth - 64 - 8, 8, 64, 64)

    private readonly carousel: ShopCarousel = new ShopCarousel(pizzasListJSON)
    private readonly leftButton: Button = new Button("left-button", () => this.carousel.left(), 0, GameScreen.getHeight - 160, 24, 64)
    private readonly rightButton: Button = new Button("right-button", () => this.carousel.right(), GameScreen.getWidth - 24, GameScreen.getHeight - 160, 24, 64)

    private readonly randomModeCheckbox: Button = new Button("disable-checkbox-button", () => GlobalStorage.toggleRandomMode(), 8, GameScreen.getHeight - 40, 32, 32)

    public init(): void {
        !GlobalStorage.getIsMoreThanTwoPizzas && this.randomModeCheckbox.hide()
    }

    public update(currentTime: number): void {
        this.homeButton.update(currentTime)

        this.randomModeCheckbox.update(currentTime)

        this.leftButton.update(currentTime)
        this.rightButton.update(currentTime)
        this.carousel.update(currentTime)
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage("shop-background", 0, 0, GameScreen.getWidth, GameScreen.getHeight)

        this.carousel.draw(currentTime)
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
}
