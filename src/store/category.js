import firebase from '../../node_modules/firebase/app'
export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        let uid = await dispatch('getUid')
        let categories = (await firebase.database().ref('/users/' + uid + '/categories').once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        let uid = await dispatch('getUid')
        await firebase.database().ref('/users/' + uid + '/categories').child(id).update({ title, limit })
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
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
