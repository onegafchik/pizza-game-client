export class Vector {
    private x: number
    private y: number

    public constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    get getX(): number {
        return this.x
    }

    get getY(): number {
        return this.y
    }

    public set(x: number, y: number): Vector {
        this.x = x
        this.y = y

        return this
    }

    public add(x: number, y: number): Vector {
        this.x += x
        this.y += y

        return this
    }

    public multiply(value: number): Vector {
        this.x *= value
        this.y *= value

        return this
    }

    public clear(): Vector {
        this.x = 0
        this.y = 0

        return this
    }

    public clone(): Vector {
        return new Vector(this.x, this.y)
    }
}
