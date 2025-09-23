import { Entity } from "./entity"
import { GameScreen } from "./game-screen"

export class Widget extends Entity {
    private isEnable: boolean = true
    private isVisible: boolean = true

    private isIntersected: boolean = false

    public constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height)
    }

    public get getIsEnable(): boolean {
        return this.isEnable
    }

    public get getIsVisible(): boolean {
        return this.isVisible
    }

    public get getIsIntersected(): boolean {
        return this.isIntersected
    }

    public get getIsPressed(): boolean {
        return this.isIntersected && GameScreen.getCursorIsPressed
    }

    public get getIsClicked(): boolean {
        return this.isIntersected && GameScreen.getCursorIsClicked
    }

    public get getIsDoubleClicked(): boolean {
        return this.isIntersected && GameScreen.getCursorIsDoubleClicked
    }

    public set setIsEnable(value: boolean) {
        this.isEnable = value
    }

    public set setIsVisible(value: boolean) {
        this.isVisible = value
    }

    public hide(): void {
        this.isEnable = false
        this.isVisible = false
    }

    public show(): void {
        this.isEnable = true
        this.isVisible = true
    }

    public update(_: number): void {
        this.isIntersected = this.isEnable && GameScreen.getIsCursorIntersectWithArea(this.getX, this.getY, this.getWidth, this.getHeight)
    }
}
