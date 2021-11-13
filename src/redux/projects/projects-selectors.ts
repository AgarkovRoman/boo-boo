import { ProjectsStateI } from './projects-types'

export const getActiveProject = (state: ProjectsStateI): string => state.projects.activeProject
