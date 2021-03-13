/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { firebase } from '../firebase'
import { TaskI } from '../redux/tasks/tasks-types'
import { ProjectI } from '../redux/projects/projects-types'
import { UserI } from '../redux/auth/auth-types'

export const authAPI = {
  authMe(callback: (user: any) => void) {
    return firebase.auth().onAuthStateChanged(callback)
  },

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  signOut() {
    return firebase.auth().signOut()
  },

  addUser(user: UserI) {
    return firebase
      .firestore()
      .collection('users')
      .add({ ...user })
  },

  signUp(email: string, password: string, name: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
}

export const projectsAPI = {
  getAllProjectsById(userId: string) {
    return firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', userId)
      .orderBy('projectId')
      .get()
  },

  addProject(project: ProjectI) {
    return firebase
      .firestore()
      .collection('projects')
      .add({ ...project })
  },

  deleteProject(docId: string) {
    return firebase.firestore().collection('projects').doc(docId).delete()
  },
}

export const tasksAPI = {
  getAllTasksById(userId: string) {
    return (
      firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', userId)
        // .orderBy('projectId')
        .get()
    )
  },

  archivedTasksById(taskId: string) {
    return firebase.firestore().collection('tasks').doc(taskId).update({ archived: true })
  },

  addTask(task: TaskI) {
    return firebase
      .firestore()
      .collection('tasks')
      .add({ ...task })
  },

  deleteTask(docId: string) {
    return firebase.firestore().collection('tasks').doc(docId).delete()
  },
}
