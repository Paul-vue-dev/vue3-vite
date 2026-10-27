import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import obfuscator from 'rollup-plugin-obfuscator' // ESM 방식으로 가져오기
import compression from 'vite-plugin-compression'
import path from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
  plugins: [
    vue(),
    // rollup-plugin-obfuscator로 코드 난독화
    obfuscator({ // default import로 호출
      compact: true,  // 공백 및 여백 제거
      controlFlowFlattening: true,  // 제어 흐름 난독화
      deadCodeInjection: true,  // 사용되지 않는 코드 삽입
      debugProtection: true,  // 디버깅 방지
      stringArray: true,  // 문자열을 배열로 변환
      stringArrayThreshold: 0.75,  // 문자열 배열화 비율
      domainLock: [], // 특정 도메인에서만 실행되도록 잠금
      identifierNamesGenerator: 'hexadecimal', // 식별자 이름 생성 방식 ('hexadecimal', 'mangled')
      log: false, // 난독화 과정 로그 출력 여부
      renameGlobals: false, // 전역 변수 및 함수 이름 변경 여부
      rotateStringArray: true, // 문자열 배열 회전
      seed: 0, // 난독화 시드 값 (동일한 시드 값으로 난독화하면 결과가 동일)
      selfDefending: true, // 난독화된 코드 자체를 보호하는 코드 추가
      shuffleStringArray: true, // 문자열 배열 섞기
      splitStrings: false, // 문자열 분할
      stringArrayEncoding: ['rc4'], // 문자열 배열 인코딩 방식 ('none', 'base64', 'rc4')
      target: 'browser', // 난독화 대상 환경 ('browser', 'node')
      transformObjectKeys: false, // 객체 키 이름 변환 여부
    }),
    compression({ algorithm: 'gzip' }), // Gzip 압축 활성화
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@'를 'src' 디렉토리로 매핑
    },
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8088,
    proxy: {
      '/todos': {
        target: env.VITE_API_URL, // 요청을 보낼 실제 서버
        
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // '/api'를 제거
      },
    },
  },
  // base: '/', // BASE_URL 설정 (기본값은 '/')
  build: {
    outDir: 'dist', // 빌드 결과물이 저장될 디렉터리
    minify: 'terser',  // Terser 사용
    terserOptions: {
      compress: {
        drop_console: true, // console.log() 제거
        dead_code: true,    // 사용되지 않는 코드 제거
      },
      mangle: {
        properties: {
          regex: /^_/  // 프로퍼티 이름도 난독화 (옵션)
        },
      },
      output: {
        beautify: false,  // 압축된 코드로 출력
        comments: false,  // 주석 제거
      },
    },
    sourcemap: false,  // 소스맵 비활성화 (디버깅 방지)
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name].[hash].js',  // 청크 파일 이름에 해시 값 추가
        entryFileNames: 'assets/[name].[hash].js',  // 엔트리 파일 이름에 해시 값 추가
        assetFileNames: 'assets/[name].[hash].[ext]',  // 자산 파일 이름에 해시 값 추가
      }
    },
  },
})
}