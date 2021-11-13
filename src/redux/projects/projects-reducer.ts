import { createSlice } from '@reduxjs/toolkit'
import { INBOX } from '../../constants/defaultProjects'
import { ProjectsI } from './projects-types'

export const initialState: ProjectsI = {
  activeProject: INBOX,
}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject(state, action) {
      state.activeProject = action.payload
    },
  },
})

export const { setActiveProject } = projectSlice.actions
export default projectSlice.reducer
