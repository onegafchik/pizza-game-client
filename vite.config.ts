import { defineConfig } from "vite"
import path from "path"
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const baseURL: string = "/pizza-game-client"

const PWA: Partial<VitePWAOptions> = {
    registerType: "autoUpdate",
    workbox: {
        globPatterns: ["**/*.{html,css,js,png}"]
    },
    manifest: {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
            { purpose: "maskable", sizes: "512x512", src: `${baseURL}/icons/icon512_maskable.png`, type: "image/png" },
            { purpose: "any", sizes: "512x512", src: `${baseURL}/icons/icon512_rounded.png`, type: "image/png" }
        ],
        orientation: "portrait",
        display: "standalone",
        name: "Pizza Game",
        short_name: "Pizza Game"
    }
}

export default defineConfig({
    plugins: [VitePWA(PWA)],
    logLevel: "silent",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    base: baseURL
})
