import { collatedTasks } from '../constants/collatedTasks'

export const getTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId)

export const getCollatedTitle = (projects, key) => projects.find((project) => project.key === key)

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject)

export const getUser = () => JSON.parse(localStorage.getItem('authUser'))
