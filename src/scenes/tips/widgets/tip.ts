import { GameScreen } from "@/game-screen"
import { Language } from "@/language"
import type { TipJSON } from "@/types"
import { Widget } from "@/widget"
import { TipBody } from "./tip-body"

export class Tip extends Widget {
    private tipBodiesList: TipBody[]

    public constructor(tip: TipJSON) {
        super(0, 0, 0, 0)

        this.tipBodiesList = tip.map((tip: TipJSON[number]) => new TipBody(tip.title[Language.getCurrentLanguage], tip.titleImage, tip.description[Language.getCurrentLanguage]))
        this.tipBodiesList.reduce((y: number, tipBody: TipBody) => {
            tipBody.setY = y
            return y + tipBody.getHeight + 20
        }, 42)
    }

    public draw(currentTime: number): void {
        this.tipBodiesList.forEach((tipBody: TipBody, index) => {
            tipBody.draw(currentTime)
            index < this.tipBodiesList.length - 1 && GameScreen.drawImage("group-line", 24, tipBody.getY + tipBody.getHeight + 4, 208, 12)
        })
    }
}
