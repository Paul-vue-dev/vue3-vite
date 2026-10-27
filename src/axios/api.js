import axios from './axios'; // axios 인스턴스 가져오기

export default {
  async getApi(url, params){
    try {
      console.log( '----------api.js' )
      console.log( url )
      // axios.get 호출 (param은 params 속성으로 전달)
      const response = await axios.get(url, { params: new URLSearchParams(params) })
      const data = response.data
  
      // 응답 데이터 중 10개의 데이터만 반환
      return data
    } catch (err) {
      // 오류 처리
      console.error('API 호출 실패:', err.message);
      return false
    }
  },
  async postApi(url, params){
    try {
      // axios.get 호출 (param은 params 속성으로 전달)
      const response = await axios.post(url, params)
      const data = response.data
  
      // 응답 데이터 중 10개의 데이터만 반환
      return data
    } catch (err) {
      // 오류 처리
      console.error('API 호출 실패:', err.message);
      return false
    }
  },
}