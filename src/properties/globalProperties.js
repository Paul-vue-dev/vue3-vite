import axios from '@/axios/axios' // axios 인스턴스 가져오기
import store from '@/store' // Vuex 스토어 가져오기

const isLog = true

export default {
  install(app) {
    // SSO 계정 정보를 저장할 전역 객체
    app.config.globalProperties.$ssoAccount = JSON.parse(localStorage.getItem('ssoAccount')) || {
      username: null,
      email: null,
      roles: [],
    };

    // SSO 계정 정보를 설정하는 메서드
    app.config.globalProperties.$setSsoAccount = (account) => {
      app.config.globalProperties.$ssoAccount = {
        ...app.config.globalProperties.$ssoAccount,
        ...account,
      };
      // localStorage에 SSO 계정 정보 저장
      localStorage.setItem('ssoAccount', JSON.stringify(app.config.globalProperties.$ssoAccount));
      store.state.$ssoAccount = app.config.globalProperties.$ssoAccount ?? localStorage.getItem('ssoAccount')
      // console.log('SSO 계정 정보가 설정되었습니다:', app.config.globalProperties.$ssoAccount);
    };

    // SSO 계정 정보를 가져오는 메서드
    app.config.globalProperties.$getSsoAccount = () => {
      return app.config.globalProperties.$ssoAccount;
    };
    
    // 1. 전역 유틸리티 메서드
    app.config.globalProperties.$formatDate = (date) => {
      if( isLog ) console.log(`[${date.toUpperCase()}]: ${date}`)
      return new Date(date).toLocaleDateString()
    }

    // 2. 전역 API 호출 메서드
    app.config.globalProperties.$axios = axios

    // // 3. 전역 상태 관리 메서드
    // app.config.globalProperties.$store = store

    // 4. 전역 알림 메서드
    app.config.globalProperties.$log = (message) => {
      // if( isLog ) console.log(`[${message.toUpperCase()}]: `, message)
      if( isLog ) console.log(`[${message}]: `, message)
    };

    // 5. 전역 상태 관리 (간단한 데이터)
    app.config.globalProperties.$user = {
      isLoggedIn: false,
      user: null,
    };

    app.config.globalProperties.$customMethod = () => {
      console.log('This is a global method!')
    }
  },
  // setStore(store) {
  //   // $store를 동적으로 설정
  //   this.store = store;
  // },
}