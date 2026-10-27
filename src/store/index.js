import { createStore } from 'vuex'

// export interface State {
//   items: Array<{ id: number; name: string }>
//   loading: boolean
//   error: string | null
// }

const store = createStore({
  state: {
    items: [],
    loading: false,
    error: null,
    ssoAccount: {}, // SSO 계정 정보
  },
  mutations: {
    setItems(state, items) {
      state.items = items
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    // async fetchItems({ commit }) {
    //   commit('setLoading', true)
    //   commit('setError', null)
    //   try {
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/todos') // API 호출
    //     const data = await response.data // 응답 데이터
    //     commit('setItems', data.slice(0, 10)) // 10개의 데이터만 가져오기
    //   } catch (error) {
    //     commit('setError', 'Failed to fetch items')
    //   } finally {
    //     commit('setLoading', false)
    //   }
    // },
  },
})

export default store