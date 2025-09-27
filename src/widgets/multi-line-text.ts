import { GameScreen } from "@/game-screen"
import { Widget } from "@/widget"

export class MultiLineText extends Widget {
    private linesList: string[] = []

    private text: string
    private fontSize: number

    public constructor(text: string, width: number, x: number, y: number, fontSize: number) {
        super(x, y, width, 0)

        this.text = text
        this.fontSize = fontSize

        this.create()
    }

    public get getText(): string {
        return this.text
    }

    public get getFontSize(): number {
        return this.fontSize
    }

    public set setText(text: string) {
        this.text = text
        this.create()
    }

    public set setWidth(width: number) {
        super.setWidth = width

        this.create()
    }

    public set setFontSize(size: number) {
        this.fontSize = size
    }

    public draw(_: number): void {
        if (!this.getIsVisible) return
        this.linesList.forEach((line: string, index: number) => GameScreen.print(line, this.getX, this.getY + index * this.fontSize * 0.7, this.fontSize))
    }

    private create(): void {
        let line: string = ""
        let linesList: string[] = []

        this.text.split(" ").forEach((word: string) => {
            if (GameScreen.getTextWidth(line + word, this.fontSize) >= this.getWidth) {
                linesList = [...linesList, line]
                line = word + " "
            } else {
                line += word + " "
            }
        })

        this.linesList = [...linesList, line]
    }
}
