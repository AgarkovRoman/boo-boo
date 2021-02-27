import { ProjectI, ProjectsStateI } from './projects-types'

export const getActiveProject = (state: ProjectsStateI): string => state.projects.activeProject
export const getAllProjects = (state: ProjectsStateI): Array<ProjectI> => state.projects.allProjects
