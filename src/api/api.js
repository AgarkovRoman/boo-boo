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

  addUser(user) {
    return firebase
      .firestore()
      .collection('users')
      .add({ ...user })
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
      .where('userId', '==', userId)
      .orderBy('projectId')
      .get()
  },

  addProject(project) {
    return firebase
      .firestore()
      .collection('projects')
      .add({ ...project })
  },

  deleteProject(docId) {
    return firebase.firestore().collection('projects').doc(docId).delete()
  },
}

export const tasksAPI = {
  getAllTasksById(userId) {
    return (
      firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', userId)
        // .orderBy('projectId')
        .get()
    )
  },

  archivedTasksById(taskId) {
    return firebase.firestore().collection('tasks').doc(taskId).update({ archived: true })
  },

  addTask(task) {
    return firebase
      .firestore()
      .collection('tasks')
      .add({ ...task })
  },

  deleteTask(docId) {
    return firebase.firestore().collection('tasks').doc(docId).delete()
  },
}
