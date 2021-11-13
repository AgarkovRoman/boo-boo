import { ThunkAction } from 'redux-thunk'
import { Action, createSlice } from '@reduxjs/toolkit'
import { INBOX } from '../../constants/defaultProjects'
import { projectsAPI } from '../../api/api'
import { CreateProjectI, ProjectsI, ProjectsStateI } from './projects-types'

export const initialState: ProjectsI = {
  activeProject: INBOX,
  allProjects: [],
}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject(state, action) {
      state.activeProject = action.payload
    },
    setAllProjects(state, action) {
      state.allProjects = action.payload
    },
    addProject(state, action) {
      state.allProjects = [...state.allProjects, action.payload]
    },
    deleteProject(state, action) {
      state.allProjects = state.allProjects.filter((project) => project.id !== action.payload)
    },
  },
})

export const { setAllProjects, setActiveProject, addProject, deleteProject } = projectSlice.actions
export default projectSlice.reducer

export const addProjectTC = (
  project: CreateProjectI
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  await projectsAPI.addProject(project).then((res) => {
    if (res) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { id, name, description } = res
      dispatch(addProject({ id, name, description }))
    }
  })
}

export const deleteProjectTC = (
  id: string
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  await projectsAPI.deleteProject(id).then((res) => {
    if (res && res.success) {
      dispatch(deleteProject(id))
    }
  })
}
