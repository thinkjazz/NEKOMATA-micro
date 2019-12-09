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
    async fetchInfo ({ dispatch, commit }) {
      try {
        let uid = await dispatch('getUid')
        let info = await firebase.database().ref('/users/' + uid + '/info').once('value')
        commit('setInfo', info.val())
      } catch (e) {

      }
    }
  },
  getters: {
    info: s => s.info
  }
}
