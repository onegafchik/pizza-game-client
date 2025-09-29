import { getIsControlsTypeGuard, type ControlsType, type PizzaName } from "./types"
import { getNumberFromLocalStorage } from "./utils"

type PizzasList = Record<PizzaName, boolean>

export class GlobalStorage {
    private static money: number = getNumberFromLocalStorage("money")
    private static highScore: number = getNumberFromLocalStorage("high-score")

    private static pizzasList: PizzasList = GlobalStorage.loadPizzasList()

    private static controlsType: ControlsType = getIsControlsTypeGuard(localStorage.getItem("controls-type")) ? (localStorage.getItem("controls-type") as ControlsType) : "half-screen"

    private static likedPizzaNamesSet: Set<PizzaName> = new Set<PizzaName>(JSON.parse(localStorage.getItem("liked-pizzas-list") ?? JSON.stringify(["pepperoni"])))

    private constructor() {}

    public static get getMoney(): number {
        return GlobalStorage.money
    }

    public static get getHighScore(): number {
        return GlobalStorage.highScore
    }

    public static get getControlsType(): ControlsType {
        return GlobalStorage.controlsType
    }

    public static get getLikedPizzaNamesList(): PizzaName[] {
        return Array.from(GlobalStorage.likedPizzaNamesSet)
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

    public static getIsLikedPizza(name: string): boolean {
        return GlobalStorage.likedPizzaNamesSet.has(name)
    }

    public static likePizza(name: string): void {
        GlobalStorage.hasPizza(name) && GlobalStorage.likedPizzaNamesSet.add(name)
        localStorage.setItem("liked-pizzas-list", JSON.stringify(Array.from(GlobalStorage.likedPizzaNamesSet)))
    }

    public static unlikePizza(name: string): void {
        GlobalStorage.likedPizzaNamesSet.size > 1 && GlobalStorage.likedPizzaNamesSet.delete(name)
        localStorage.setItem("liked-pizzas-list", JSON.stringify(Array.from(GlobalStorage.likedPizzaNamesSet)))
    }

    public static buyPizza(name: PizzaName, cost: number): boolean {
        if (GlobalStorage.money >= cost) {
            GlobalStorage.money -= cost
            GlobalStorage.pizzasList[name] = true

            localStorage.setItem("money", GlobalStorage.money.toString())
            GlobalStorage.savePizzasList()
            return true
        }

        return false
    }

    public static hasPizza(name: string): boolean {
        return GlobalStorage.pizzasList[name] ?? false
    }

    private static savePizzasList(): void {
        let key: string
        let pizzasList: String[] = []

        for (key in GlobalStorage.pizzasList) pizzasList = [...pizzasList, key]

        localStorage.setItem("new-pizzas-list", JSON.stringify(pizzasList))
    }

    private static loadPizzasList(): PizzasList {
        const oldTypeData: string | null = localStorage.getItem("pizzas-list")

        if (oldTypeData) {
            const parsedOldTypeData: Record<PizzaName, string> = JSON.parse(oldTypeData) as Record<PizzaName, string>

            let key: string
            let newPizzasList: string[] = []

            for (key in parsedOldTypeData) newPizzasList = [...newPizzasList, key]

            localStorage.setItem("new-pizzas-list", JSON.stringify(newPizzasList))
            localStorage.removeItem("pizzas-list")
        }

        const data: string | null = localStorage.getItem("new-pizzas-list")

        if (data) {
            const parsedData: PizzaName[] = JSON.parse(data) as PizzaName[]

            const pizzasList: Record<PizzaName, boolean> = {}
            parsedData.forEach((pizzaName: PizzaName) => (pizzasList[pizzaName] = true))

            return pizzasList
        }

        return { pepperoni: true }
    }
}
