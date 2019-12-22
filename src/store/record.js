import firebase from './../../node_modules/firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        let uid = await dispatch('getUid')
        await firebase.database().ref('/users/' + uid + '/records').push(record)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
