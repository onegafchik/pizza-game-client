import { getIsControlsTypeGuard, type ControlsType, type PizzaName } from "./types"
import { getBooleanFromLocalStorage, getNumberFromLocalStorage } from "./utils"

export class GlobalStorage {
    private static money: number = getNumberFromLocalStorage("money")
    private static highScore: number = getNumberFromLocalStorage("high-score")

    private static pizzasList: Record<PizzaName, boolean> = JSON.parse(localStorage.getItem("pizzas-list") ?? JSON.stringify({ pepperoni: true }))

    private static controlsType: ControlsType = getIsControlsTypeGuard(localStorage.getItem("controls-type")) ? (localStorage.getItem("controls-type") as ControlsType) : "half-screen"

    private static chosenPizza: PizzaName = localStorage.getItem("chosen-pizza") ?? "pepperoni"
    private static isRandomModeEnabled: boolean = getBooleanFromLocalStorage("random-mode")

    private constructor() {}

    public static get getIsMoreThanTwoPizzas(): boolean {
        return Object.values(GlobalStorage.pizzasList).filter((value: boolean) => value).length > 1
    }

    public static get getMoney(): number {
        return GlobalStorage.money
    }

    public static get getHighScore(): number {
        return GlobalStorage.highScore
    }

    public static get getControlsType(): ControlsType {
        return GlobalStorage.controlsType
    }

    public static get getChosenPizza(): PizzaName {
        return GlobalStorage.chosenPizza
    }

    public static get getIsRandomModeEnabled(): boolean {
        return GlobalStorage.isRandomModeEnabled
    }

    public static set setControlsType(type: ControlsType) {
        GlobalStorage.controlsType = type
        localStorage.setItem("controls-type", GlobalStorage.controlsType)
    }

    public static addMoney(count: number): void {
        GlobalStorage.money += count
        localStorage.setItem("money", GlobalStorage.money.toString())
    }

    public static updateHighScore(score: number): void {
        if (GlobalStorage.highScore < score) {
            GlobalStorage.highScore = score
            localStorage.setItem("high-score", GlobalStorage.highScore.toString())
        }
    }

    public static choosePizza(name: PizzaName): void {
        if (GlobalStorage.hasPizza(name)) {
            GlobalStorage.chosenPizza = name
            localStorage.setItem("chosen-pizza", GlobalStorage.chosenPizza)
        }
    }

    public static toggleRandomMode(): void {
        GlobalStorage.isRandomModeEnabled = !GlobalStorage.isRandomModeEnabled
        localStorage.setItem("random-mode", `${GlobalStorage.isRandomModeEnabled}`)
    }

    public static buyPizza(name: PizzaName, cost: number) {
        if (GlobalStorage.money >= cost) {
            GlobalStorage.money -= cost
            GlobalStorage.pizzasList[name] = true

            localStorage.setItem("money", GlobalStorage.money.toString())
            localStorage.setItem("pizzas-list", JSON.stringify(GlobalStorage.pizzasList))
        }
    }

    public static hasPizza(name: string): boolean {
        return GlobalStorage.pizzasList[name] ?? false
    }
}
