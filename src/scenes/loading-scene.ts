import imageListJSON from "../config/image-list.json"

import { Scene } from "@/scene"
import { GameScreen } from "@/game-screen"
import { Language } from "@/language"
import { MenuScene } from "./menu-scene"

export class LoadingScene extends Scene {
    private readonly isShowImageListDataInConsole: boolean = false

    private isImageListLoaded: boolean = false

    public init(): void {
        this.loadImageList()
    }

    public update(_: number): void {
        this.isImageListLoaded && this.stop(new MenuScene())
    }

    public draw(_: number): void {
        GameScreen.setCurrentColor = "#000000"
        GameScreen.fill(0, 0, GameScreen.getWidth, GameScreen.getHeight)

        GameScreen.setCurrentColor = "#ffffff"
        !this.isImageListLoaded && GameScreen.print(Language.getText("loading resources"), GameScreen.getWidth / 2, GameScreen.getHeight / 2 - 20, 30, "center")
    }

    private loadImageList(): void {
        const promisesList: Promise<string>[] = []

        for (const [imageName, imageSource] of Object.entries(imageListJSON.list)) {
            promisesList.push(GameScreen.loadImage(imageName, `${imageListJSON.root}${imageSource}`))
        }

        Promise.allSettled(promisesList)
            .then((settledResults: PromiseSettledResult<string>[]) => {
                if (!this.isShowImageListDataInConsole) return

                console.groupCollapsed("IMAGE LIST")

                settledResults.forEach((imageLoadResult: PromiseSettledResult<string>) =>
                    imageLoadResult.status === "fulfilled" ? console.log(`${imageLoadResult.value} - OK`) : console.error(`${imageLoadResult.reason} - ERROR`)
                )

                console.groupEnd()
            })
            .finally(() => (this.isImageListLoaded = true))
    }
}
