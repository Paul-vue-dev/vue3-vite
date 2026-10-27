import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from 'vue-loading-overlay' // vue-loading-overlay 사용
import DataGridType3View from '../views/DataGridType3View.vue'
import Editor from '../views/Editor.vue'
import LoadingBar from '../views/LoadingBar.vue'
import AlertModal from '../views/AlertModal.vue'
import Chart from '../views/Chart.vue'
import AxiosExam from '../views/AxiosExam.vue'
import VuexExam from '../views/VuexExam.vue'
import LodashExam from '../views/LodashExam.vue'
import VeeValidateExam from '../views/VeeValidateExam.vue'
import SsoExam from '../views/SsoExam.vue'

const BASE_URL = import.meta.BASE_URL || '/' // import.meta.env로 변경
const routes = [
  {
    path: '/',
    name: 'SsoExam',
    component: SsoExam,
  },
  {
    path: '/DataGridType3View',
    name: 'DataGridType3View',
    component: DataGridType3View
  },
  {
    path: '/Editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/LoadingBar',
    name: 'LoadingBar',
    component: LoadingBar
  },
  {
    path: '/AlertModal',
    name: 'AlertModal',
    component: AlertModal
  },
  {
    path: '/Chart',
    name: 'Chart',
    component: Chart
  },
  {
    path: '/axios-exam',
    name: 'AxiosExam',
    component: AxiosExam,
  },
  {
    path: '/VuexExam',
    name: 'VuexExam',
    component: VuexExam,
  },
  {
    path: '/LodashExam',
    name: 'LodashExam',
    component: LodashExam,
  },
  {
    path: '/VeeValidateExam',
    name: 'VeeValidateExam',
    component: VeeValidateExam,
  },
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
})

// 로딩 표시를 위한 라우터 훅 추가
router.beforeEach((to, from, next) => {
  const loader = useLoading().show() // 로딩 오버레이 표시
  setTimeout(() => {
    loader.hide() // 2초 후 로딩 오버레이 숨김
    next() // 라우팅 진행
  }, 300)
})

export default router
