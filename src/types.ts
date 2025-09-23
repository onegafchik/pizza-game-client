import pizzasListJSON from "./config/pizzas-list.json"

export type PizzaName = (typeof pizzasListJSON)[number]["name"]
export type PizzaJSON = (typeof pizzasListJSON)[number]

export type LanguageType = "english" | "russian"

export function getIsLanguageTypeGuard(value: unknown): value is LanguageType {
    return typeof value === "string" && (value === "english" || value === "russian")
}

export type ControlsType = "half-screen" | "behind-finger"

export function getIsControlsTypeGuard(value: unknown): value is ControlsType {
    return typeof value === "string" && (value === "half-screen" || value === "behind-finger")
}
