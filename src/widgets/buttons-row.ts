import { Widget } from "@/widget"
import { Button } from "./button"

type ButtonParameters = [[string, Function], [string, Function], [string, Function]] | [[string, Function], [string, Function]]

export class ButtonsRow extends Widget {
    private buttonsList: Button[] = []

    private centerX: number
    private margin: number
    private readonly buttonSize: number

    public constructor(buttonsParameters: ButtonParameters, centerX: number, y: number, margin: number, buttonSize: number) {
        super(0, y, 0, buttonSize)

        this.buttonsList = buttonsParameters.map((buttonParameter: [string, Function]) => new Button(buttonParameter[0], buttonParameter[1], 0, y, buttonSize, buttonSize))

        this.centerX = centerX
        this.margin = margin
        this.buttonSize = buttonSize

        this.updateRow()
    }

    public get getButtonsList(): Button[] {
        return this.buttonsList
    }

    public get getCenterX(): number {
        return this.centerX
    }

    public get getMargin(): number {
        return this.margin
    }

    public set setCenterX(x: number) {
        this.centerX = x
        this.updateRow()
    }

    public set setMargin(margin: number) {
        this.margin = margin
        this.updateRow()
    }

    public hide(): void {
        super.hide()
        this.buttonsList.forEach((button: Button) => button.hide())
    }

    public show(): void {
        super.show()
        this.buttonsList.forEach((button: Button) => button.show())
    }

    public update(currentTime: number): void {
        super.update(currentTime)

        this.buttonsList.forEach((button: Button) => button.update(currentTime))
    }

    public draw(currentTime: number): void {
        this.buttonsList.forEach((button: Button) => button.draw(currentTime))
    }

    private updateRow(): void {
        if (this.buttonsList.length === 2) {
            this.buttonsList[0].setX = this.centerX - this.buttonSize - this.margin
            this.buttonsList[1].setX = this.centerX + this.margin
        } else {
            this.buttonsList[0].setX = this.centerX - this.buttonSize * 1.5 - this.margin * 2
            this.buttonsList[1].setX = this.centerX - this.buttonSize / 2
            this.buttonsList[2].setX = this.centerX + this.buttonSize / 2 + this.margin * 2
        }

        this.setX = this.buttonsList[0].getX
        this.setWidth = this.buttonSize * this.buttonsList.length + this.margin * 2 * (this.buttonsList.length - 1)
    }
}
