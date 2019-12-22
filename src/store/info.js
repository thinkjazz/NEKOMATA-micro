import firebase from '../../node_modules/firebase/app'
export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        let uid = await dispatch('getUid')
        let updateData = { ...getters.info, ...toUpdate }
        await firebase.database().ref('/users/' + uid + '/info').update(updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchInfo ({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUid')
        let info = await firebase.database().ref('/users/' + uid + '/info').once('value')
        commit('setInfo', info.val())
      } catch (error) {

      }
    }
  },
  getters: {
    info: s => s.info
  }
}
