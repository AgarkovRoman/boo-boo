/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosResponse } from 'axios'
import { firebase } from '../firebase'
import { TaskI } from '../redux/tasks/tasks-types'
import { CreateProjectI, DeleteProjectI, ProjectI } from '../redux/projects/projects-types'

const axiosInstance = axios.create({
  // baseURL: 'https://boo-boo-server.herokuapp.com/api/',
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes('/auth/login' || '/auth/registration')) {
      return config
    }
    const authUser = JSON.parse(localStorage.getItem('authUser') || '')
    if (config.headers) {
      config.headers.Authorization = authUser ? `Bearer ${authUser?.accessToken}` : ''
      return config
    }
  },
  (error) => Promise.reject(error)
)

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
  getAllProjectsById() {
    return axiosInstance
      .get<ProjectI[]>('/project/byUser')
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  addProject(project: CreateProjectI) {
    return axiosInstance
      .post('/project/create', project)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  deleteProject(id: string) {
    return axiosInstance
      .delete<DeleteProjectI>(`/project/${id}`)
      .then((res) => res.data)
      .catch((e) => console.log(e))
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
