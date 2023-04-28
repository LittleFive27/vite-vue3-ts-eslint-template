import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// vite项目运行自动检查eslint
import eslintPlugin from 'vite-plugin-eslint'

// 自动导入Vue相关函数和组件
import AutoImport from 'unplugin-auto-import/vite'
// 按需导入组件，包括自定义组件和UI库,vant的函数需要手动引入(函数 + 样式)
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自动导入vue和vue-router相关函数
      dts: './auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
      // 使用自动导入插件，需要在配置相应的eslint，否则eslint以为你没有导入，会报错
      eslintrc: {
        // true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
        enabled: false, // 默认false
        filepath: './.eslintrc-auto-import.json', // 生成json文件,可以不配置该项，默认就是将生成在根目录
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [VantResolver()]
      // dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import，默认为src/components
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: [
      // 配置 @ 指代 src
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  },

  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 定义全局的scss变量
        // 给导入的路径最后加上 ;
        additionalData: '@import "@/assets/styles/mixin/index.scss";'
      }
    }
  }
})
