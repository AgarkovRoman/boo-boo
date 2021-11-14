/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { CreateTaskI, DeleteTaskI, TaskI } from '../redux/tasks/tasks-types'
import { CreateProjectI, DeleteProjectI, ProjectI } from '../redux/projects/projects-types'

// const BASE_URL = 'https://boo-boo-server.herokuapp.com/api/'
const BASE_URL = 'http://localhost:8080/api/'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

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

function prepareAuthorizationHeaders(headers: Headers): Headers {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '')
  if (authUser) {
    headers.set('authorization', `Bearer ${authUser?.accessToken}`)
  }
  return headers
}

export const projectsAPI = createApi({
  reducerPath: 'projectsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: prepareAuthorizationHeaders,
  }),
  endpoints: (build) => ({
    getAllProjectsById: build.query<ProjectI[], string>({
      query: () => ({
        url: '/project/byUser',
      }),
    }),
    deleteProject: build.mutation<DeleteProjectI, string>({
      query: (id) => ({
        url: `/project/${id}`,
        method: 'DELETE',
      }),
    }),
    addProject: build.mutation<ProjectI, CreateProjectI>({
      query: (project) => ({
        url: '/project/create',
        method: 'POST',
        body: project,
      }),
    }),
  }),
})

type UpdateTaskById = {
  taskId: string
  task: CreateTaskI
}

export const tasks2API = createApi({
  reducerPath: 'tasksAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: prepareAuthorizationHeaders,
  }),
  endpoints: (build) => ({
    getAllTasksById: build.query<TaskI[], string>({
      query: () => ({
        url: '/task/byUser',
      }),
    }),
    addTask: build.mutation<TaskI, CreateTaskI>({
      query: (task) => ({
        url: '/task/create',
        method: 'POST',
        body: task,
      }),
    }),
    updateTaskById: build.mutation<TaskI, UpdateTaskById>({
      query: ({ taskId, task }) => ({
        url: `/task/${taskId}`,
        method: 'PATCH',
        body: task,
      }),
    }),
    deleteTask: build.mutation<DeleteTaskI, string>({
      query: (taskId) => ({
        url: `/task/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
})
