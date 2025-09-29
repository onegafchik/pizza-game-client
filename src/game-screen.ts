interface GameCursor {
    x: number
    y: number
    isPressed: boolean
    isClicked: boolean
}

export class GameScreen {
    private static isInitialized: boolean = false

    private static readonly width: number = 256
    private static readonly height: number = 512
    private static scaleX: number = 1
    private static scaleY: number = 1
    private static offsetX: number = 0

    private static readonly cursor: GameCursor = {
        x: -1,
        y: -1,
        isPressed: false,
        isClicked: false
    }

    private static readonly keysList: Record<string, boolean> = {}

    private static readonly imageList: Map<string, HTMLImageElement> = new Map()

    private static readonly canvasElement: HTMLCanvasElement = document.querySelector("#app-canvas")!
    private static readonly context: CanvasRenderingContext2D = GameScreen.canvasElement.getContext("2d")!

    private constructor() {}

    public static get getWidth(): number {
        return GameScreen.width
    }

    public static get getHeight(): number {
        return GameScreen.height
    }

    public static get getCursorX(): number {
        return GameScreen.cursor.x
    }

    public static get getCursorY(): number {
        return GameScreen.cursor.y
    }

    public static get getCursorIsPressed(): boolean {
        return GameScreen.cursor.isPressed
    }

    public static get getCursorIsClicked(): boolean {
        return GameScreen.cursor.isClicked
    }

    public static get getCurrentColor(): string {
        return typeof GameScreen.context.fillStyle === "string" ? GameScreen.context.fillStyle : "#000000"
    }

    public static get getAlpha(): number {
        return GameScreen.context.globalAlpha
    }

    public static set setCurrentColor(color: string) {
        GameScreen.context.fillStyle = color
    }

    public static set setAlpha(value: number) {
        GameScreen.context.globalAlpha = Math.max(0, value)
    }

    private static set setFontSize(size: number) {
        GameScreen.context.font = `${size}px old-pixel`
    }

    public static init(): void {
        if (GameScreen.isInitialized) return
        else GameScreen.isInitialized = true

        GameScreen.updateCanvas()

        window.addEventListener("resize", GameScreen.updateCanvas)

        // GameScreen.canvasElement.addEventListener("contextmenu", (event: PointerEvent) => event.preventDefault())
        GameScreen.canvasElement.addEventListener("wheel", (event: WheelEvent) => event.preventDefault())

        GameScreen.canvasElement.addEventListener("click", GameScreen.handleMouseEvent)

        GameScreen.canvasElement.addEventListener("mousedown", GameScreen.handleMouseEvent)
        GameScreen.canvasElement.addEventListener("mousemove", GameScreen.handleMouseEvent)
        GameScreen.canvasElement.addEventListener("mouseup", GameScreen.handleMouseEvent)

        GameScreen.canvasElement.addEventListener("touchstart", GameScreen.handleTouchEvent)
        GameScreen.canvasElement.addEventListener("touchmove", GameScreen.handleTouchEvent)
        GameScreen.canvasElement.addEventListener("touchend", GameScreen.handleTouchEvent)

        window.addEventListener("keydown", GameScreen.handleKeyEvent)
        window.addEventListener("keyup", GameScreen.handleKeyEvent)
    }

    public static getIsCursorIntersectWithArea(x: number, y: number, width: number, height: number): boolean {
        return GameScreen.cursor.x >= x && GameScreen.cursor.x <= x + width && GameScreen.cursor.y >= y && GameScreen.cursor.y <= y + height
    }

    public static updateCursor(): void {
        GameScreen.cursor.isClicked = false
    }

    public static getIsKeyPressed(key: string): boolean {
        return key === "space" ? GameScreen.keysList[" "] : GameScreen.keysList[key.toLowerCase()]
    }

    public static clear(): void {
        GameScreen.context.restore()
        GameScreen.context.save()
        GameScreen.context.scale(GameScreen.scaleX, GameScreen.scaleY)

        GameScreen.context.clearRect(0, 0, GameScreen.width, GameScreen.height)
    }

    public static fill(x: number, y: number, width: number, height: number): void {
        GameScreen.context.fillRect(x, y, width, height)
    }

    public static print(text: string, x: number, y: number, fontSize: number, textAlign: CanvasTextAlign = "left"): void {
        GameScreen.context.textAlign = textAlign
        GameScreen.setFontSize = fontSize
        GameScreen.context.fillText(text, x, y)
    }

    public static getTextWidth(text: string, fontSize: number): number {
        GameScreen.setFontSize = fontSize
        return Math.round(GameScreen.context.measureText(text).width)
    }

    public static loadImage(name: string, source: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const image: HTMLImageElement = new Image()
            image.src = source

            image.addEventListener("load", () => resolve(source))
            image.addEventListener("error", () => reject(source))

            GameScreen.imageList.set(name, image)
        })
    }

    public static drawImage(imageName: string, x: number, y: number, width: number, height: number): void {
        try {
            GameScreen.context.drawImage(GameScreen.imageList.get(imageName)!, x, y, width, height)
        } catch {
            GameScreen.drawUnknownImage(x, y, width, height)
        }
    }

    public static drawSprite(imageName: string, sourceX: number, sourceY: number, sourceWidth: number, sourceHeight: number, x: number, y: number, width: number, height: number): void {
        try {
            GameScreen.context.drawImage(GameScreen.imageList.get(imageName)!, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
        } catch {
            GameScreen.drawUnknownImage(x, y, width, height)
        }
    }

    private static drawUnknownImage(x: number, y: number, width: number, height: number): void {
        const previousColor: string = GameScreen.getCurrentColor

        GameScreen.setCurrentColor = "#000000"
        GameScreen.fill(x, y, width / 2, height / 2)
        GameScreen.fill(x + width / 2, y + height / 2, width / 2, height / 2)
        GameScreen.setCurrentColor = "#aa00aa"
        GameScreen.fill(x + width / 2, y, width / 2, height / 2)
        GameScreen.fill(x, y + height / 2, width / 2, height / 2)

        GameScreen.setCurrentColor = previousColor
    }

    private static updateCanvas(): void {
        GameScreen.canvasElement.width = Math.min(512, document.documentElement.clientWidth)
        GameScreen.canvasElement.height = document.documentElement.clientHeight

        GameScreen.context.textBaseline = "top"
        GameScreen.context.imageSmoothingEnabled = false

        GameScreen.scaleX = GameScreen.canvasElement.width / GameScreen.width
        GameScreen.scaleY = GameScreen.canvasElement.height / GameScreen.height
        GameScreen.offsetX = GameScreen.canvasElement.getBoundingClientRect().left
    }

    private static handleMouseEvent(event: MouseEvent) {
        GameScreen.cursor.x = Math.trunc((event.pageX - GameScreen.offsetX) / GameScreen.scaleX)
        GameScreen.cursor.y = Math.trunc(event.pageY / GameScreen.scaleY)

        if (event.type === "click") GameScreen.cursor.isClicked = true
        else if (event.type === "mousedown") GameScreen.cursor.isPressed = true
        else if (event.type === "mouseup") GameScreen.cursor.isPressed = false
    }

    private static handleTouchEvent(event: TouchEvent) {
        event.preventDefault()

        if (event.type !== "touchend") {
            GameScreen.cursor.x = Math.trunc((event.touches[event.touches.length - 1].pageX - GameScreen.offsetX) / GameScreen.scaleX)
            GameScreen.cursor.y = Math.trunc(event.touches[event.touches.length - 1].pageY / GameScreen.scaleY)
        }

        if (event.type === "touchstart") GameScreen.cursor.isPressed = true
        else if (event.type === "touchend") {
            GameScreen.cursor.isClicked = true
            GameScreen.cursor.isPressed = event.touches.length > 0
        }
    }

    private static handleKeyEvent(event: KeyboardEvent) {
        if (event.ctrlKey || event.shiftKey || event.altKey) return
        GameScreen.keysList[event.key.toLowerCase()] = event.type === "keydown"
    }
}
