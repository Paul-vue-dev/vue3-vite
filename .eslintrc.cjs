module.exports = {
  root: true,
  env: {
    browser: true, // 브라우저 환경
    es2021: true   // 최신 ECMAScript 기능 사용
  },
  extends: [
    // 'plugin:vue/vue3-essential', // Vue 3 필수 규칙
    'eslint:recommended',       // ESLint 기본 권장 규칙
    'airbnb-base',              // Airbnb JavaScript 스타일 가이드
    '@vue/eslint-config-prettier/skip-formatting' // Prettier와 충돌 방지
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest', // 최신 ECMAScript 문법 지원
    sourceType: 'module'   // ES 모듈 사용
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']], // '@'를 './src'로 매핑
        extensions: ['.js', '.vue'] // 확장자 자동 인식
      }
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'] // Vite 관련 모듈 인식
  },
  plugins: ['vue'],
  rules: {
    semi: ['off'], // 세미콜론 사용 여부 비활성화
    camelcase: ['off'], // 카멜케이스 강제 비활성화
    'vue/multi-word-component-names': 'off', // 단일 단어 컴포넌트 이름 허용
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['config'] // 특정 변수 수정 허용
      }
    ],
    'import/prefer-default-export': 'off', // 단일 export 허용
    'prefer-destructuring': 'off', // 비구조화 할당 강제 비활성화
    'import/no-extraneous-dependencies': 'off', // 의존성 체크 비활성화
    'object-shorthand': 'off', // 객체 축약형 비활성화
    'import/no-unresolved': 'off', // 경로 확인 비활성화
    'import/order': 'off', // import 순서 규칙 비활성화
    'spaced-comment': 'off', // 주석 스타일 규칙 비활성화

    // 1. 코드 일관성 유지
    'quotes': ['error', 'single'], // 작은따옴표 사용 강제
    // 'indent': ['error', 2], // 2칸 들여쓰기 강제
    'no-console': 'warn', // console.log 사용 시 경고
    'no-debugger': 'error', // debugger 사용 금지
    'no-unused-vars': [
      'warn',
      {
        vars: 'all', // 모든 변수 체크
        args: 'after-used', // 사용된 인자 체크
        ignoreRestSiblings: true // 나머지 형제 무시
      }
    ],

    // 2. Vue 관련 규칙
    // 'vue/html-indent': ['error', 2], // HTML 들여쓰기 2칸
    'vue/max-attributes-per-line': ['error', { singleline: 3 }], // 한 줄에 최대 3개의 속성
    'vue/singleline-html-element-content-newline': 'off' // 단일 줄 HTML 요소의 줄바꿈 비활성화
  }
};
