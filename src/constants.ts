import pizzasListJSON from "./config/pizzas-list.json"

import type { PizzaName } from "./types"

// @ts-ignore
export const baseURL: string = import.meta.env.BASE_URL

export const pizzasNamesList: PizzaName[] = pizzasListJSON.map(({ name }) => name)
export const defaultPizzaNamesList: PizzaName[] = pizzasListJSON.filter(({ crystal }) => !crystal).map(({ name }) => name)
export const crystalPizzaNamesList: PizzaName[] = pizzasListJSON.filter(({ crystal }) => crystal).map(({ name }) => name)
export const oxidizedPizzaNamesList: PizzaName[] = pizzasListJSON.filter(({ oxidized }) => oxidized).map(({ name }) => name)

export const links: Record<string, string> = {
    telegram: "https://t.me/onegaf",
    github: "https://github.com/onegafchik",
    stickersTelegram: "https://t.me/addstickers/pizzagame",
    devblog: "https://nektarin.itch.io/pizza-game/devlog"
}
