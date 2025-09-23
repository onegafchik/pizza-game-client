import { Vector } from "./vector"

export class Entity {
    private x: number
    private y: number
    private width: number
    private height: number

    private readonly velocity: Vector = new Vector()

    private lastTime: number = 0

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    public get getX(): number {
        return this.x
    }

    public get getY(): number {
        return this.y
    }

    public get getWidth(): number {
        return this.width
    }

    public get getHeight(): number {
        return this.height
    }

    public get getVelocity(): Vector {
        return this.velocity
    }

    public set setX(x: number) {
        this.x = x
    }

    public set setY(y: number) {
        this.y = y
    }

    public set setWidth(width: number) {
        this.width = width
    }

    public set setHeight(height: number) {
        this.height = height
    }

    public detectWithAnotherEntity(entity: Entity): boolean {
        return this.x + this.width >= entity.getX && this.x <= entity.getX + entity.getWidth && this.y + this.height >= entity.getY && this.y <= entity.getY + entity.getHeight
    }

    public update(currentTime: number) {
        this.lastTime === 0 && (this.lastTime = currentTime)

        this.x += this.velocity.getX * ((currentTime - this.lastTime) / 1000)
        this.y += this.velocity.getY * ((currentTime - this.lastTime) / 1000)

        this.lastTime = currentTime
        this.velocity.clear()
    }

    // @ts-ignore
    public draw(currentTime: number) {}
}
