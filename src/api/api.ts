/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { firebase } from '../firebase'
import { TaskI } from '../redux/tasks/tasks-types'
import { ProjectI } from '../redux/projects/projects-types'

const axiosInstance = axios.create({
  // baseURL: 'https://boo-boo-server.herokuapp.com/api/',
  baseURL: 'http://localhost:8080/api/',
  headers: { 'Access-Control-Allow-Origin': '*' },
})

export const authAPI = {
  // authMe(callback: (user: any) => void) {
  //   return firebase.auth().onAuthStateChanged(callback)
  // },

  signIn(login: string, password: string) {
    const data = {
      login,
      password,
    }
    return axiosInstance
      .post('/auth/login', data)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  signUp(login: string, password: string) {
    const data = {
      login,
      password,
    }
    return axiosInstance
      .post('/auth/registration/', data)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  signOut(token: string) {
    const data = {
      token,
    }
    return axiosInstance
      .post('/auth/logout/', data)
      .then((res) => res.data)
      .catch((e) => console.log(e))
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
