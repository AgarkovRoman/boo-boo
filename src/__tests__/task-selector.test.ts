import { getAllTasks } from '../redux/tasks/tasks-selectors'
import { TasksStateI } from '../redux/tasks/tasks-types'

const mockState: TasksStateI = {
  tasks: {
    allTasks: [
      {
        name: 'test1',
        description: '',
        date: '4321',
        archived: false,
        userId: '999',
        projectId: '123',
        id: '132313123',
      },
      {
        name: 'test2',
        description: '',
        date: '43231',
        archived: false,
        userId: '999',
        projectId: '123',
        id: '132313123',
      },
    ],
  },
}

describe('task-selector', () => {
  test('getAllTasks should take all tasks', () => {
    expect(getAllTasks(mockState)).toEqual(mockState.tasks.allTasks)
  })
})
