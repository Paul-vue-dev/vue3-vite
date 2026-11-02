# Vue3 + Vite Zod / TanStack Vue Query 실습 및 인증·WebSocket 점검

기준: `Paul-vue-dev/vue3-vite` main 브랜치의 별도 실험 브랜치. 기존 화면·Vuex·Axios 인터셉터·라우트 동작은 교체하지 않는다.

## 실습 방법
1. Node.js 22, npm 10 환경을 권장한다(원본 README 기준).
2. 이 브랜치에는 새 라이브러리 선언만 추가되어 있다. 네트워크가 되는 개발 PC에서 `npm install`을 수행하여 반드시 **package-lock.json도 갱신하고 커밋**해야 한다. 그 전에는 `npm ci`와 CI/build 수용을 PASS로 처리하지 않는다.
3. `npm run test:demo-api` (Node 내장 테스트: 파일 저장, 재시작 후 조회, 동시 저장 테스트).
4. `npm run dev` 실행, 브라우저에서 `http://localhost:8088/integration-lab` 접속.
5. 제목과 수량 입력 → **API로 저장** → 리스트 자동 갱신 확인 → F5 후 데이터 유지 확인.
6. 개발자 도구 Network에서 `POST /__demo/api/notes`와 `GET /__demo/api/notes` 확인. 제목 한 글자나 수량 0을 입력하면 Zod 검증 오류가 표시된다. **잘못된 응답 검사** 버튼은 의도적인 Zod 검증 실패를 표시하며 실제 서버 요청은 하지 않는다.

## 저장 구현의 경계
- 실제 HTTP API지만 **Vite 개발 서버 전용**이고 운영 빌드에서 제공되지 않는다.
- 작성 데이터는 `node_modules/.cache/vue-query-demo.json`에 저장한다. 저장 위치를 삭제하거나 다른 PC·컨테이너에서 실행하면 공유되지 않는다. DB, 계정, 주문, 비밀번호는 저장하지 않는다.
- 기존 Vite 설정이 `host: 0.0.0.0`이므로 데모 API는 loopback 접속만 허용한다. 인증된 실제 서버가 아니다.
- Zod는 프론트의 요청/응답 규격을 검증하고, 데모 API에는 별도로 서버 측 입력 검증이 있다. 프론트 검증만으로 보안을 보장할 수 없다.
- 기존 `axios.js`, `api.js`는 변경하지 않았다. 데모에서는 실패를 숨기지 않도록 별도 `fetch` 클라이언트를 사용한다.
- TanStack Query의 POST 성공 시 `invalidateQueries`로 자동 재조회한다. 동시 저장은 프론트 pending 및 서버 직렬화로 제한한다.

## WebSocket 점검 및 개선 제안
- 현행 소스 트리에서 `WebSocket`, `socket.io` 등 실시간 연결 코드는 확인되지 않았다. 개발 서버 단순 API 예제에는 WebSocket이 필수는 아니다.
- 향후 실제 서버에 WebSocket을 도입한다면 접속/인증, 재연결 백오프, 구독 해제, heartbeat, seq/version, 중복·누락 이벤트 처리, 접속 종료 정리, 토큰 만료 및 재인증을 설계한다.
- 수신한 서버 이벤트는 해당 QueryKey를 `invalidateQueries`하거나 검증된 이벤트만 `setQueryData`로 반영한다.
- Redis는 WebSocket 필수 구성 요소가 아니고 다중 서버의 이벤트·캐시를 공유할 필요가 있을 때만 검토한다.

## 로그인·세션 점검 및 개선 제안
- `SsoExam.vue`는 실제 로그인 검증이 아닌 예제 데이터이다. `globalProperties.js`의 `$ssoAccount`와 Vuex의 `ssoAccount` 이름이 다르며, `$store` 등록은 주석 처리되어 있어 SSO 화면 오류 가능성이 있다.
- `localStorage`에는 인증 토큰·실제 세션 비밀값을 저장하지 않는다. 실제 서버 정책에 따라 HttpOnly/Secure/SameSite 쿠키 또는 짧은 수명의 액세스 토큰/리프레시 전략을 선택한다.
- 서버에서 로그인/로그아웃/세션 상태 조회/만료/CSRF/권한 검사/Refresh Rotation/감사 로그 등을 정의하고, 프론트에서는 `/auth/me`와 `401` 응답 및 라우터 가드를 일관되게 처리한다.
- 사용자명과 역할은 클라이언트 화면 표시값일 뿐 서버 권한 근거가 되어서는 안 된다. 계정별 Query 캐시 삭제 및 WebSocket 연결 종료도 로그아웃 흐름에 포함한다.
- 실제 BACK API와 쿠키/세션 정책이 제공되기 전에는 인증 성공이나 운영 보안 검증으로 간주하지 않는다.

## 후속 수용 항목
- [ ] 새 의존성 package-lock 동기화 + `npm ci` PASS
- [ ] `npm run build` PASS, 기존 라우트 회귀 점검
- [ ] 로컬 `test:demo-api` PASS
- [ ] 브라우저 POST/GET/F5 저장 확인 및 네트워크 응답 캡처
- [ ] 기존 Vuex/SSO 상태 오류와 API 오류 처리 개선은 별도 변경으로 진행
- [ ] WebSocket 서버 인터페이스/세션 API 계약 수립 후 실서버 연동 검증
