import axios from 'axios'
import { useLoading } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css' // CSS 파일 추가

let loader = null // 로딩 오버레이 초기화
const timeout = 20 * 1000 // 요청 타임아웃 설정 (20초)

// Axios 기본 설정
const instance = axios.create({
  timeout, // 요청 타임아웃 설정 (20초)
})

// 요청 전처리 설정
instance.interceptors.request.use(
  (config) => {
    if (!loader) {
      loader = useLoading().show() // 로딩 오버레이 표시
    }
    console.log('Request:', config)
    return config
  },
  (error) => {
    if (loader) {
      loader.hide() // 로딩 오버레이 숨김
      loader = null
    }
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 응답 후처리 설정
instance.interceptors.response.use(
  (response) => {
    if (loader) {
      loader.hide() // 로딩 오버레이 숨김
      loader = null
    }
    console.log('Response:', response)
    return response
  },
  (error) => {
    if (loader) {
      loader.hide() // 로딩 오버레이 숨김
      loader = null
    }

    // 공통 에러 처리
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          console.error('잘못된 요청입니다.')
          break
        case 401:
          console.error('인증이 필요합니다.')
          break
        case 403:
          console.error('권한이 없습니다.')
          break
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.')
          break
        case 500:
          console.error('서버 오류가 발생했습니다.')
          break
        default:
          console.error(`오류가 발생했습니다. (상태 코드: ${status})`)
      }
    } else if (error.request) {
      console.error('서버로부터 응답이 없습니다.')
    } else {
      console.error(`요청 중 오류가 발생했습니다: ${error.message}`)
    }

    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default instance