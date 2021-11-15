/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { CreateTaskI, DeleteTaskI, TaskI } from '../redux/tasks/tasks-types'
import { CreateProjectI, DeleteProjectI, ProjectI } from '../redux/projects/projects-types'
import { LogoutResponseI, SignInI, UserIServer } from '../redux/auth/auth-types'

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

function prepareAuthorizationHeaders(headers: Headers): Headers {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '')
  if (authUser) {
    headers.set('authorization', `Bearer ${authUser?.accessToken}`)
  }
  return headers
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    logOut: build.mutation<LogoutResponseI, string>({
      query: (token) => ({
        url: '/auth/logout/',
        method: 'POST',
        body: token,
      }),
    }),
    signIn: build.mutation<UserIServer, SignInI>({
      query: ({ login, password }) => ({
        url: '/auth/login/',
        method: 'POST',
        body: { login, password },
      }),
    }),
    signUp: build.mutation<UserIServer, SignInI>({
      query: ({ login, password }) => ({
        url: '/auth/registration/',
        method: 'POST',
        body: { login, password },
      }),
    }),
  }),
})

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

export const tasksAPI = createApi({
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
