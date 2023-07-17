import {resolve} from 'path';
import {defineConfig} from "vite";

export default defineConfig({
    esbuild: {
        jsxImportSource: './src/jsx-runtime',
        jsxFactory: 'VDom.createElement',
    },
    resolve: {
        alias: [
            {
                find: '@/jsx', replacement: resolve(__dirname, "./src/jsx-runtime/index.js")
            }
        ]
    }
})