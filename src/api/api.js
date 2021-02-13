/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { firebase } from '../firebase'

export const authAPI = {
  authMe(callback) {
    return firebase.auth().onAuthStateChanged(callback)
  },

  signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  signOut() {
    return firebase.auth().signOut()
  },

  signUp(email, password, name) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
}

export const projectsAPI = {
  getAllProjectsById(userId) {
    return firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'RM6FGvtHAMviaIDJNas')
      .orderBy('projectId')
      .get()
  },
}
