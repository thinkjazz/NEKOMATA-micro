import firebase from '../../node_modules/firebase/app'
export default {
  actions: {
    async  createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        let uid = await dispatch('getUid')
        let category = await firebase.database().ref('/users/' + uid + '/categories').push({ title, limit })
        return { title, limit, id: category.key }
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
