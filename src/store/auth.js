import firebase from './../../node_modules/firebase/app'
export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) { throw e }
    },
    async register ({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        let uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name
        })
      } catch (e) { throw e }
    },
    getUid () {
      let user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout () {
      await firebase.auth().signOut()
    }
  }
}
