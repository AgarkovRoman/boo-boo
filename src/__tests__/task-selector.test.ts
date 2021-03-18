import { createSelector } from 'reselect'
import { getAllTasks, getNotArchivedTasks } from '../redux/tasks/tasks-selectors'

const mockState = {
  tasks: {
    allTasks: [
      {
        task: 'test1',
        createDate: 123231,
        date: '4321',
        archived: false,
        userId: '999',
        projectId: '123',
        id: '132313123',
        docId: '132313123',
      },
      {
        task: 'test2',
        createDate: 1232331,
        date: '43231',
        archived: false,
        userId: '999',
        projectId: '123',
        id: '132313123',
        docId: '132313123',
      },
    ],
  },
}

describe('task-selector', () => {
  test('getAllTasks should take all tasks', () => {
    expect(getAllTasks(mockState)).toEqual(mockState.tasks.allTasks)
  })
})
