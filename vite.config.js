import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator' // ESM 방식으로 가져오기
import compression from 'vite-plugin-compression'
import path from 'path';
import { demoApiPlugin } from './plugins/demoApi.mjs'

// https://vitejs.dev/config/
// export default defineConfig({
export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
  plugins: [
    vue(),
    demoApiPlugin(), // 개발 서버 전용: 로컬 JSON 저장 샘플 API
    // rollup-plugin-obfuscator로 코드 난독화
    ...(command === 'build' ? [obfuscator({ // 운영 빌드에만 난독화 적용 (Vite 개발 모드의 동적 import 분석 보호)
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
      domainLock: [],
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      renameGlobals: false,
      rotateStringArray: true,
      seed: 0,
      selfDefending: true,
      shuffleStringArray: true,
      splitStrings: false,
      stringArrayEncoding: ['rc4'],
      target: 'browser',
      transformObjectKeys: false,
    })] : []),
    compression({ algorithm: 'gzip' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/todos': {
        target: env.VITE_API_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        dead_code: true,
      },
      mangle: {
        properties: {
          regex: /^_/
        },
      },
      output: {
        beautify: false,
        comments: false,
      },
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      }
    },
  },
})
}
