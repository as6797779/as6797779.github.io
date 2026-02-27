import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'


// 仓库名（若仓库名是 xxx.github.io，base 设为 '/'；否则设为 '/仓库名/'）
const base = process.env.NODE_ENV === 'production' ? '/你的仓库名/' : '/'

// https://vite.dev/config/
export default defineConfig({
   base: base,
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
