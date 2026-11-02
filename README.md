Bizmine
Vue3 +  Vite

개발환경
- node v22.14.0
- npm v10.9.2
- vue v3.5.13
- vite v4.5.13
- vuex v4.0.2

## 실습: Zod + TanStack Vue Query API 저장 (feature 브랜치 전용)

이 샘플은 개발 서버에서만 노출되며 실제 DB, 사용자 세션, 운영 API를 사용하지 않습니다.

```bash
npm ci
npm run test:demo-api
npm run dev
```

브라우저에서 `http://localhost:8088/integration-lab`을 열어 제목·수량을 입력한 뒤 **API로 저장**을 클릭합니다. Zod 입력/응답 검증, HTTP GET/POST, TanStack Query의 목록 자동 갱신, 새로고침 후 로컬 파일 유지 여부를 확인할 수 있습니다.

데모 파일 위치: `node_modules/.cache/vue-query-demo.json` (Git 제외).
실제 로그인/세션 및 WebSocket 검토 사항은 [연동 점검 문서](docs/integration-lab-review.md)를 참고합니다.
