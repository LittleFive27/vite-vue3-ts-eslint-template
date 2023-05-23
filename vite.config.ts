import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// vite项目运行自动检查eslint
import eslintPlugin from 'vite-plugin-eslint'

// 自动导入Vue相关函数和组件
import AutoImport from 'unplugin-auto-import/vite'
// 按需导入组件，包括自定义组件和UI库,vant的函数需要手动引入(函数 + 样式)
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from 'vite-plugin-mock'
import svgLoader from 'vite-svg-loader'
import { visualizer } from 'rollup-plugin-visualizer'

const CWD = process.cwd()
export default ({ mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_PROXY_TARGET, VITE_HASH, VITE_VISUALIZE, VITE_ASSETS_BASE } = loadEnv(mode, CWD)

  // 测试环境不加hash
  let output = {
    manualChunks: {
      vue: ['vue', 'vue-router', 'pinia', '@vueuse/core']
    }
  }
  if (VITE_HASH === 'false') {
    const names = {
      entryFileNames: `assets/[name].js`,
      chunkFileNames: `assets/[name].js`,
      assetFileNames: `assets/[name].[ext]`
    }
    output = { ...output, ...names }
  }

  // 可视化分析
  let visualizerPlugin = {}
  if (VITE_VISUALIZE === 'true') {
    visualizerPlugin = visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true
    })
  }

  return {
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
      }),
      {
        ...viteMockServe(),
        apply: 'serve'
      },
      svgLoader(),
      visualizerPlugin
    ],
    base: VITE_ASSETS_BASE || '/', // 设置打包路径
    server: {
      host: '0.0.0.0',
      proxy: {
        '^/(api|tools)': {
          target: VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false
        }
      }
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
    },
    build: {
      outDir: `dist-${mode}`,
      // 压缩代码
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      // 合并小文件
      rollupOptions: {
        output: output
      },
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      chunkSizeWarningLimit: 2000
    }
  }
}
