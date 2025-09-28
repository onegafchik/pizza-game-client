import { GameScreen } from "@/game-screen"
import { Widget } from "@/widget"
import { MultiLineText } from "@/widgets/multi-line-text"

export class TipBody extends Widget {
    private readonly title: string
    private readonly titleImage: string
    private readonly description: MultiLineText

    public constructor(title: string, titleImage: string, description: string) {
        super(28, 0, GameScreen.getWidth - 56, 0)

        this.title = title
        this.titleImage = titleImage
        this.description = new MultiLineText(description, this.getWidth, this.getX, this.getY + 32, 20)

        this.setHeight = 32 + this.description.getHeight
    }

    public get getTitle(): string {
        return this.title
    }

    public get getTitleImage(): string {
        return this.titleImage
    }

    public get getDescription(): string {
        return this.description.getText
    }

    public set setY(y: number) {
        super.setY = y
        this.description.setY = y + 32
    }

    public draw(currentTime: number): void {
        GameScreen.drawImage(this.titleImage, this.getX, this.getY - 2, 32, 32)
        GameScreen.setCurrentColor = "#ffffff"
        GameScreen.print(this.title, this.getX + 36, this.getY, 28)
        this.description.draw(currentTime)
    }
}
