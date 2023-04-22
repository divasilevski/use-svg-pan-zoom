import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    vue(),
    svgr(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./composables'],
    }),
  ],
  test: {
    environmentMatchGlobs: [['./tests/**', 'jsdom']],
  },
})
