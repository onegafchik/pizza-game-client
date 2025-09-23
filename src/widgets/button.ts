import { GameScreen } from "@/game-screen"
import { Widget } from "@/widget"

export class Button extends Widget {
    private imageName: string
    private readonly callback: Function

    public constructor(imageName: string, callback: Function, x: number, y: number, width: number, height: number) {
        super(x, y, width, height)

        this.imageName = imageName
        this.callback = callback
    }

    public get getImageName(): string {
        return this.imageName
    }

    public set setImageName(imageName: string) {
        this.imageName = imageName
    }

    public update(currentTime: number): void {
        super.update(currentTime)

        this.getIsEnable && this.getIsClicked && this.callback()
    }

    public draw(_: number): void {
        this.getIsVisible && GameScreen.drawImage(this.imageName, this.getX, this.getY, this.getWidth, this.getHeight)
    }
}
