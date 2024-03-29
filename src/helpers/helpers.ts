import { collatedTaskI, collatedTasks } from '../constants/collatedTasks'
import { ProjectI } from '../redux/projects/projects-types'

export const getTitle = (projects: Array<ProjectI>, projectId: string): string => {
  const object = projects.find((project) => project.id === projectId)
  if (object !== undefined) {
    return object.name
  }
  return ''
}

export const getCollatedTitle = (projects: Array<collatedTaskI>, key: string): string => {
  const object = projects.find((project) => project.key === key)
  if (object !== undefined) {
    return object.name
  }
  return ''
}

export const collatedTasksExist = (selectedProject: string): collatedTaskI | undefined =>
  collatedTasks.find((task) => task.key === selectedProject)
