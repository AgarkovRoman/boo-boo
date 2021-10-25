/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { CreateTaskI, DeleteTaskI, TaskI } from '../redux/tasks/tasks-types'
import { CreateProjectI, DeleteProjectI, ProjectI } from '../redux/projects/projects-types'

const axiosInstance = axios.create({
  baseURL: 'https://boo-boo-server.herokuapp.com/api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

// const authInterceptor = axiosInstance.interceptors.request.use(
//   (config) => {
//     if (config.url?.includes('/auth/login' || '/auth/registration')) {
//       return config
//     }
//     const authUser = JSON.parse(localStorage.getItem('authUser') || '')
//     if (config.headers) {
//       config.headers.Authorization = authUser ? `Bearer ${authUser?.accessToken}` : ''
//       return config
//     }
//   },
//   (error) => Promise.reject(error)
// )

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      typeof config.url === 'string' &&
      (config.url.includes('/auth/login') || config.url.includes('/auth/registration'))
    ) {
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

// const deleteIntercepter = () =>  axiosInstance.interceptors.request.eject(authInterceptor)

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
      .post('/auth/registration', data)
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
  addTask(task: CreateTaskI) {
    return axiosInstance
      .post('/task/create', task)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  getAllTasksById() {
    return axiosInstance
      .get<TaskI[]>('/task/byUser')
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  updateTaskById(taskId: string, task: CreateTaskI) {
    return axiosInstance
      .patch(`/task/${taskId}`, task)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },

  deleteTask(id: string) {
    return axiosInstance
      .delete<DeleteTaskI>(`/task/${id}`)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  },
}
