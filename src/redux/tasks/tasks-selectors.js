import { createSelector } from 'reselect'
import { INBOX, NEXT_7, TODAY } from '../../constants/defaultProjects'

export const getAllTasks = (state) => state.tasks.allTasks

export const getNotArchivedTasks = createSelector(getAllTasks, (tasks) =>
  tasks.filter((task) => !task.archived)
)

export const getInboxTasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks) => tasks.filter((elem) => elem.projectId === INBOX).length
)

export const getTodayTasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks) => tasks.filter((elem) => elem.projectId === TODAY).length
)

export const getNext7TasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks) => tasks.filter((elem) => elem.projectId === NEXT_7).length
)
