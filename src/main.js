import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import Loading from 'vue-loading-overlay'
import VueSweetalert2 from 'vue-sweetalert2'
import globalProperties from '@/properties/globalProperties'; // globalProperties 가져오기
import { VueGoodTable } from 'vue-good-table-next';
import store from '@/store' // Vuex 스토어 가져오기

import './style.css'
import 'vue-loading-overlay/dist/css/index.css' // 로딩 오버레이 CSS import
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-good-table-next/dist/vue-good-table-next.css';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalProperties); // globalProperties 등록
app.use(VueSweetalert2)

// // 전역 컴포넌트로 등록
app.component('LoadingBar', Loading)
app.component('VueGoodTable', VueGoodTable);

// // 전역 DOM 조작
// app.directive('focus', {
//     mounted(el) {
//         el.focus()
//     }
// })

// //전역 오류 체크
// app.config.errorHandler = (err, vm, info) => {
//     console.error(err, info)
// }

app.mount('#app');